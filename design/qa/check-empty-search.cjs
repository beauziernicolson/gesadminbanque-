const route = process.argv[2] || "/admin/membres";
const port = process.argv[3] || "9223";
const appPort = process.argv[4] || "3010";

(async () => {
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error("No Chrome tab found on the DevTools port.");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  let nextId = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  };
  await new Promise((resolve, reject) => { socket.onerror = reject; socket.onopen = resolve; });
  const call = (method, params = {}) => new Promise((resolve) => { const id = ++nextId; pending.set(id, resolve); socket.send(JSON.stringify({ id, method, params })); });
  await call("Page.navigate", { url: `http://127.0.0.1:${appPort}${route}` });
  await new Promise((resolve) => setTimeout(resolve, 1600));
  const target = await call("Runtime.evaluate", { returnByValue: true, expression: `(()=>{const r=document.querySelector('.filter-search input').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()` });
  const { x, y } = target.result.result.value;
  await call("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await call("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
  await call("Input.insertText", { text: "recherche-test" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = await call("Runtime.evaluate", { returnByValue: true, expression: "JSON.stringify((()=>{const input=document.querySelector('.filter-search input');const key=Object.keys(input).find((item)=>item.startsWith('__reactProps'));return {query:input?.value,emptyState:document.querySelector('.list-panel .empty-panel h3')?.textContent,rows:document.querySelectorAll('.list-panel tbody tr').length,reactProps:key?Object.keys(input[key]):[]}})())" });
  console.log(result.result.result.value);
  socket.close();
})();
