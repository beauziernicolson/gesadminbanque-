const port = process.argv[2] || "9223";
const appPort = process.argv[3] || "3010";

async function main() {
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error(`Open a Chrome page on DevTools port ${port}.`);
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  let nextId = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const resolve = pending.get(message.id);
    if (resolve) {
      pending.delete(message.id);
      resolve(message);
    }
  };
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.error || response.result.exceptionDetails) throw new Error(JSON.stringify(response.error || response.result.exceptionDetails));
    return response.result.result.value;
  };
  const key = async (value, modifiers = 0) => {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: value, code: value, windowsVirtualKeyCode: value === "Tab" ? 9 : 27, nativeVirtualKeyCode: value === "Tab" ? 9 : 27, modifiers });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: value, code: value, windowsVirtualKeyCode: value === "Tab" ? 9 : 27, nativeVirtualKeyCode: value === "Tab" ? 9 : 27, modifiers });
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: `http://127.0.0.1:${appPort}/admin/transactions` });
  for (let attempt = 0; attempt < 40; attempt++) {
    const ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('.mobile-menu-toggle')");
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const before = await evaluate("document.body.scrollWidth");
  if (before !== 390) throw new Error(`Unexpected mobile scroll width before opening drawer: ${before}`);
  await evaluate("document.querySelector('.mobile-menu-toggle').click(); true");
  await new Promise((resolve) => setTimeout(resolve, 60));
  const opened = await evaluate("JSON.stringify({dialog:document.querySelector('.sidebar').getAttribute('role'),modal:document.querySelector('.sidebar').getAttribute('aria-modal'),inert:document.querySelector('.main-area').inert,focus:document.activeElement.className,overflow:document.body.style.overflow,last:document.querySelectorAll('.sidebar nav a')[document.querySelectorAll('.sidebar nav a').length-1]?.textContent})");
  const openedState = JSON.parse(opened);
  if (openedState.dialog !== "dialog" || openedState.modal !== "true" || !openedState.inert || openedState.overflow !== "hidden" || openedState.focus !== "drawer-close") throw new Error(`Drawer open state failed: ${opened}`);
  await key("Tab", 8);
  const shiftWrapped = await evaluate("document.activeElement.textContent.trim()");
  if (shiftWrapped !== openedState.last) throw new Error(`Shift+Tab did not wrap to the final navigation link: ${shiftWrapped}`);
  await key("Tab");
  const tabWrapped = await evaluate("document.activeElement.className");
  if (tabWrapped !== "drawer-close") throw new Error(`Tab did not wrap to the drawer close button: ${tabWrapped}`);
  await key("Escape");
  await new Promise((resolve) => setTimeout(resolve, 60));
  const closed = await evaluate("JSON.stringify({expanded:document.querySelector('.mobile-menu-toggle').getAttribute('aria-expanded'),inert:document.querySelector('.main-area').inert,focus:document.activeElement.className,overflow:document.body.style.overflow})");
  const closedState = JSON.parse(closed);
  if (closedState.expanded !== "false" || closedState.inert || closedState.focus !== "mobile-menu-toggle" || closedState.overflow !== "") throw new Error(`Escape close state failed: ${closed}`);
  await evaluate("document.querySelector('.mobile-menu-toggle').click(); true");
  await new Promise((resolve) => setTimeout(resolve, 60));
  await evaluate("document.querySelector('.drawer-backdrop').click(); true");
  await new Promise((resolve) => setTimeout(resolve, 60));
  const backdropClosed = await evaluate("JSON.stringify({expanded:document.querySelector('.mobile-menu-toggle').getAttribute('aria-expanded'),focus:document.activeElement.className})");
  if (JSON.parse(backdropClosed).expanded !== "false" || JSON.parse(backdropClosed).focus !== "mobile-menu-toggle") throw new Error(`Backdrop close state failed: ${backdropClosed}`);
  const contrast = await evaluate("(()=>{const color=getComputedStyle(document.querySelector('.module-empty p')).color.match(/[0-9.]+/g).map(Number);const channel=color.map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4});const luminance=.2126*channel[0]+.7152*channel[1]+.0722*channel[2];return {color:getComputedStyle(document.querySelector('.module-empty p')).color,ratio:Number((1.05/(luminance+.05)).toFixed(2))}})()");
  if (contrast.ratio < 4.5) throw new Error(`Empty-state text contrast is below 4.5:1: ${JSON.stringify(contrast)}`);
  console.log(JSON.stringify({mobileWidth: before, openedState, shiftWrapped, tabWrapped, closedState, backdropClosed, contrast}, null, 2));
  socket.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
