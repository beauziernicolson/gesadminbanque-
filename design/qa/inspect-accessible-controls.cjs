const port = process.argv[2] || "9223";
const appPort = process.argv[3] || "3010";

(async () => {
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error(`No Chrome page on DevTools port ${port}.`);
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (response.id && pending.has(response.id)) { pending.get(response.id)(response); pending.delete(response.id); }
  };
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  const call = (method, params = {}) => new Promise((resolve) => { const requestId = ++id; pending.set(requestId, resolve); socket.send(JSON.stringify({ id: requestId, method, params })); });
  await call("Page.navigate", { url: `http://127.0.0.1:${appPort}/admin/plans/nouveau` });
  await new Promise((resolve) => setTimeout(resolve, 800));
  const result = await call("Runtime.evaluate", { returnByValue: true, expression: `JSON.stringify([...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height}).map(e=>({tag:e.tagName,type:e.type,html:e.outerHTML.slice(0,260),labels:[...(e.labels||[])].map(l=>({text:l.textContent.trim(),inner:l.innerText.trim(),html:l.outerHTML.slice(0,300)})),closestLabel:e.closest('label')?.innerText.trim(),aria:e.getAttribute('aria-label'),title:e.title})))` });
  console.log(result.result.result.value);
  socket.close();
})().catch((error) => { console.error(error); process.exitCode = 1; });
