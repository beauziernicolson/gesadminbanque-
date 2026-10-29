const fs = require("node:fs");

const debugPort = process.argv[2] || "9223";
const appPort = process.argv[3] || "3010";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 1600);
const state = process.argv[6] || "expanded";
const expanded = state !== "default";
const fullPage = process.argv[7] === "full";
const output = `design/qa/admin-plans-nouveau-${state}-${width}x${height}${fullPage ? "-fullpage" : ""}.png`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const pages = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error(`Open Chrome DevTools on port ${debugPort} first.`);

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
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: `http://127.0.0.1:${appPort}/admin/plans/nouveau` });
  await delay(1800);

  const opened = await send("Runtime.evaluate", {
    returnByValue: true,
    awaitPromise: true,
    expression: `(() => {
      document.querySelectorAll("details.plan-advanced-section").forEach((section) => { section.open = ${expanded}; });
      return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))));
    })()`,
  });
  if (opened.exceptionDetails) throw new Error("Could not open the plan sections.");
  await delay(500);

  const audit = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `JSON.stringify({
      title: document.querySelector("h1")?.textContent?.trim(),
      currency: document.querySelector('select[disabled]')?.value,
      numericDefaults: [...document.querySelectorAll('input[type="number"]')].map((input) => input.value),
      openSections: [...document.querySelectorAll("details.plan-advanced-section")].map((section) => ({ title: section.querySelector("summary")?.textContent?.trim(), open: section.open })),
      blankTextFields: [...document.querySelectorAll(".plan-form input:not([type=number]), .plan-form select:not(:disabled), .plan-form textarea")].every((input) => !input.value),
      disabledActions: [...document.querySelectorAll(".plan-publication-actions button, .plan-publication-footer button")].every((button) => button.disabled),
      visibleActionCount: [...document.querySelectorAll(".plan-publication-actions button, .plan-publication-footer button")].filter((button) => getComputedStyle(button.closest(".plan-publication-actions, .plan-publication-footer")).display !== "none" && (!button.closest("details") || button.closest("details").open)).length,
      viewportClientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight
    })`,
  });
  const result = JSON.parse(audit.result.value);
  console.log(JSON.stringify({ ...result, state, expanded }));
  if (result.currency !== "HTG") throw new Error(`Expected HTG currency; got ${result.currency}.`);
  if (result.numericDefaults.length !== 6 || result.numericDefaults.some((value) => value !== "0")) {
    throw new Error(`Expected six numeric zero defaults; got ${JSON.stringify(result.numericDefaults)}.`);
  }
  if (!result.blankTextFields || !result.disabledActions || result.visibleActionCount !== 2 || result.openSections.some((section) => section.open !== expanded)) {
    throw new Error(`The plan form is not in the expected empty ${state} preview state.`);
  }
  if (result.scrollWidth > result.viewportClientWidth) throw new Error(`Horizontal overflow: ${result.scrollWidth}px in a ${result.viewportClientWidth}px viewport.`);

  await send("Runtime.evaluate", { expression: "document.querySelector('nextjs-portal')?.remove()" });

  const metrics = await send("Page.getLayoutMetrics");
  const content = metrics.cssContentSize;
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: fullPage ? content.height : Math.min(content.height, height), scale: 1 },
  });
  fs.writeFileSync(output, Buffer.from(screenshot.data, "base64"));
  console.log(JSON.stringify({ ...result, screenshot: output }));
  socket.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
