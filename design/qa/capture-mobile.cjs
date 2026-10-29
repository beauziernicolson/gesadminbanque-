const fs = require("node:fs");

const route = process.argv[2] || "/admin/vue-generale";
const port = process.argv[3] || "9223";
const width = Number(process.argv[4] || 390);
const height = Number(process.argv[5] || 844);
const appPort = process.argv[6] || "3010";
const output = `design/qa/${route.replace(/\W+/g, "-").replace(/^-|-$/g, "")}-${width}x${height}.png`;

(async () => {
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error(`Open a page in the Chrome session on port ${port} first.`);
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onerror = reject;
    socket.onopen = () => socket.send(JSON.stringify({ id: 1, method: "Page.navigate", params: { url: `http://127.0.0.1:${appPort}${route}` } }));
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id === 1) socket.send(JSON.stringify({ id: 2, method: "Emulation.setDeviceMetricsOverride", params: { width, height, deviceScaleFactor: 1, mobile: width <= 700 } }));
      if (message.id === 2) socket.send(JSON.stringify({ id: 3, method: "Page.reload", params: { ignoreCache: true } }));
      if (message.id === 3) setTimeout(() => socket.send(JSON.stringify({ id: 4, method: "Runtime.evaluate", params: { returnByValue: true, expression: `JSON.stringify({width:innerWidth,scrollWidth:document.body.scrollWidth,gridColumns:document.querySelector('.metric-grid')&&getComputedStyle(document.querySelector('.metric-grid')).gridTemplateColumns,gridWidth:document.querySelector('.metric-grid')?.getBoundingClientRect().width,calendarGrid:(()=>{const element=document.querySelector('.calendar-blank-grid');const parent=element?.parentElement;return element&&{width:element.getBoundingClientRect().width,height:element.getBoundingClientRect().height,display:getComputedStyle(element).display,columns:getComputedStyle(element).gridTemplateColumns,parentWidth:parent?.getBoundingClientRect().width,parentClass:parent?.className}})(),numericDefaults:[...document.querySelectorAll('input[type=number]')].map((input)=>input.value),overflows:[...document.querySelectorAll('body *')].map((element)=>({tag:element.tagName,cls:element.className?.baseVal||element.className,right:element.getBoundingClientRect().right,width:element.getBoundingClientRect().width,scrollableRegion:!!element.closest('.table-wrap,.module-tabs')})).filter((entry)=>entry.right>innerWidth+1&&!entry.scrollableRegion).slice(0,10)})` } })), 1000);
      if (message.id === 4) { console.log(message.result.result.value); socket.send(JSON.stringify({ id: 5, method: "Page.captureScreenshot", params: { format: "png", captureBeyondViewport: false } })); }
      if (message.id === 5) { fs.writeFileSync(output, Buffer.from(message.result.data, "base64")); console.log(`Screenshot: ${output}`); socket.close(); resolve(); }
    };
  });
})();
