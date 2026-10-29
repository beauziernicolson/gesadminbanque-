const fs = require("node:fs");
const path = require("node:path");

const [route, widthArg = "1440", heightArg = "1000", outputArg, debugPort = "9224", appPort = "3017"] = process.argv.slice(2);
if (!route?.startsWith("/")) throw new Error("Usage: node capture-route.cjs /admin/transactions [width] [height] [output.png] [debugPort] [appPort]");
const width = Number(widthArg);
const height = Number(heightArg);
const output = outputArg || `design/qa/capture-${route.replace(/^\/+|\/+$/g, "").replaceAll("/", "-")}-${width}x${height}.png`;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const pages = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error(`No Chrome page found on DevTools port ${debugPort}.`);

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 0;
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  };
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 760 });
  await send("Page.navigate", { url: `http://127.0.0.1:${appPort}${route}` });
  await delay(2200);

  const audit = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `JSON.stringify({title: document.querySelector("h1")?.textContent?.trim() ?? "", viewportWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, hasUnavailableState: /(?:Données .{0,48} indisponibles|Aucun(?:e)? .{0,80}|Résultats de recherche indisponibles)/i.test(document.body.innerText), numericDefaults: [...document.querySelectorAll('input[type="number"]')].map((input) => input.value)})`,
  });
  const result = JSON.parse(audit.result.value);
  if (!result.title) throw new Error(`No page title rendered at ${route}.`);
  if (result.scrollWidth > result.viewportWidth) throw new Error(`Horizontal overflow: ${result.scrollWidth}px in a ${result.viewportWidth}px viewport.`);
  await send("Runtime.evaluate", { expression: "document.querySelectorAll('nextjs-portal').forEach((node) => node.remove())" });

  const screenshot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(screenshot.data, "base64"));
  console.log(JSON.stringify({ ...result, screenshot: output }));
  socket.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
