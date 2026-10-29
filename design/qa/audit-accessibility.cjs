const fs = require("node:fs");
const path = require("node:path");

const routes = [
  "/connexion",
  "/admin/vue-generale",
  "/admin/membres",
  "/admin/membres/dossier",
  "/admin/kyc",
  "/admin/kyc/dossier",
  "/admin/vue-financiere",
  "/admin/tresorerie",
  "/admin/transactions",
  "/admin/transactions/dossier",
  "/admin/depots-retraits",
  "/admin/grand-livre",
  "/admin/plans",
  "/admin/plans/nouveau",
  "/admin/souscriptions",
  "/admin/souscriptions/dossier",
  "/admin/contrats",
  "/admin/contrats/dossier",
  "/admin/echeances",
  "/admin/financements",
  "/admin/risques",
  "/admin/risques/incident",
  "/admin/support",
  "/admin/support/conversation",
  "/admin/documents",
  "/admin/rapports",
  "/admin/equipe",
  "/admin/roles-permissions",
  "/admin/audit",
  "/admin/parametres",
  "/admin/integrations-flexicash",
  "/admin/notifications",
  "/admin/etats-interface",
];
const devtoolsPort = process.argv[2] || "9223";
const appPort = process.argv[3] || "3010";
const widths = [320, 390, 720, 834, 1440];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const pages = await (await fetch(`http://127.0.0.1:${devtoolsPort}/json/list`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error(`No Chrome page found on DevTools port ${devtoolsPort}.`);
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 0;
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    pending.get(message.id)(message);
    pending.delete(message.id);
  };
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, (message) => message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message));
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.result.exceptionDetails) throw new Error(JSON.stringify(result.result.exceptionDetails));
    return result.result.result.value;
  };
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Accessibility.enable");
  const findings = [];
  const routesVisited = new Set();

  for (const width of widths) {
    const height = width <= 390 ? 844 : width === 720 ? 900 : width === 834 ? 1112 : 1000;
    await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 700 });
    for (const route of routes) {
      await call("Page.navigate", { url: `http://127.0.0.1:${appPort}${route}` });
      let ready = false;
      for (let attempt = 0; attempt < 40; attempt++) {
        await delay(100);
        ready = await evaluate("document.readyState === 'complete' && !!document.body && document.body.innerText.length > 0");
        if (ready) break;
      }
      if (!ready) {
        findings.push({ route, width, type: "page-not-ready" });
        continue;
      }
      await delay(80);
      const result = await evaluate(`(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
        };
        const rgb = (value) => {
          const match = value.match(/[\\d.]+/g);
          return match ? match.slice(0, 3).map(Number) : null;
        };
        const luminance = (value) => {
          const channels = rgb(value);
          if (!channels) return null;
          const [r, g, b] = channels.map((channel) => { const normalized = channel / 255; return normalized <= .04045 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4; });
          return .2126 * r + .7152 * g + .0722 * b;
        };
        const contrast = (foreground, background) => {
          const a = luminance(foreground), b = luminance(background);
          return a === null || b === null ? null : (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
        };
        const backgroundFor = (element) => {
          for (let current = element; current && current !== document.documentElement; current = current.parentElement) {
            const color = getComputedStyle(current).backgroundColor;
            if (color && color !== 'transparent' && !color.endsWith(', 0)')) return color;
          }
          return 'rgb(255, 255, 255)';
        };
        const text = [];
        for (const element of document.querySelectorAll('body *')) {
          if (!visible(element) || element.closest('[aria-hidden="true"]') || element.matches(':disabled,[aria-disabled="true"]') || ![...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && /[\\p{L}\\p{N}]/u.test(node.textContent))) continue;
          const style = getComputedStyle(element);
          if (style.webkitTextFillColor === 'transparent') continue;
          const foreground = style.color;
          const background = backgroundFor(element);
          const ratio = contrast(foreground, background);
          const fontSize = Number.parseFloat(style.fontSize);
          const bold = Number.parseInt(style.fontWeight, 10) >= 700;
          const threshold = fontSize >= 24 || (bold && fontSize >= 18.66) ? 3 : 4.5;
          if (ratio !== null && ratio < threshold) text.push({text: element.textContent.trim().replace(/\\s+/g,' ').slice(0,80), color: foreground, background, ratio: Number(ratio.toFixed(2)), threshold});
        }
        const controls = [...document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [role=button], [role=link]')].filter(visible).map((element) => {
          const label = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby') || element.labels?.[0]?.textContent || element.innerText || element.getAttribute('title') || element.getAttribute('placeholder') || '';
          return {tag: element.tagName, role: element.getAttribute('role'), label: label.trim().replace(/\\s+/g,' ').slice(0,80), disabled: element.disabled || element.getAttribute('aria-disabled') === 'true'};
        }).filter((control) => !control.label);
        const invalidImages = [...document.querySelectorAll('img:not([alt])')].filter(visible).map((image) => image.src);
        const h1 = [...document.querySelectorAll('h1')].filter(visible).length;
        const main = [...document.querySelectorAll('main,[role=main]')].filter(visible).length;
        const numericDefaults = [...document.querySelectorAll('input[type=number]')].map((input) => ({value: input.value, label: input.labels?.[0]?.innerText || input.getAttribute('aria-label') || ''}));
        const overflow = [...document.querySelectorAll('body *')].filter(visible).map((element) => ({tag: element.tagName, cls: typeof element.className === 'string' ? element.className : '', right: element.getBoundingClientRect().right, region: !!element.closest('.table-wrap,.module-tabs,.sidebar nav')})).filter((item) => item.right > innerWidth + 1 && !item.region).slice(0,5);
        return {width:innerWidth, scrollWidth:document.documentElement.scrollWidth, h1, main, text, controls, invalidImages, numericDefaults, overflow};
      })()`);
      routesVisited.add(route);
      if (result.scrollWidth > width + 1) findings.push({ route, width, type: "document-overflow", value: result.scrollWidth });
      if (result.h1 !== 1) findings.push({ route, width, type: "h1-count", value: result.h1 });
      if (result.main !== 1) findings.push({ route, width, type: "main-landmark-count", value: result.main });
      if (result.text.length) findings.push({ route, width, type: "text-contrast", samples: result.text.slice(0, 8) });
      if (result.controls.length) findings.push({ route, width, type: "unnamed-controls", samples: result.controls.slice(0, 8) });
      if (result.invalidImages.length) findings.push({ route, width, type: "images-without-alt", samples: result.invalidImages.slice(0, 4) });
      if (result.numericDefaults.some((input) => input.value !== "0")) findings.push({ route, width, type: "nonzero-numeric-default", samples: result.numericDefaults.filter((input) => input.value !== "0") });
      if (result.overflow.length) findings.push({ route, width, type: "element-overflow", samples: result.overflow });
      if (width === 390) {
        const tree = await call("Accessibility.getFullAXTree");
        const unnamed = (tree.result.nodes || []).filter((node) => !node.ignored && ["button", "link", "textbox", "combobox", "checkbox", "tab"].includes(node.role?.value) && !node.name?.value).map((node) => ({ role: node.role.value, backendDOMNodeId: node.backendDOMNodeId }));
        if (unnamed.length) findings.push({ route, width, type: "unnamed-accessibility-tree-nodes", samples: unnamed.slice(0, 10) });
      }
    }
    console.log(`Audited ${routesVisited.size}/${routes.length} routes at ${width}px`);
  }
  const grouped = new Map();
  for (const finding of findings) {
    const key = `${finding.type}|${finding.width}`;
    const group = grouped.get(key) || { type: finding.type, width: finding.width, occurrences: 0, routes: [], samples: [] };
    group.occurrences += 1;
    if (!group.routes.includes(finding.route) && group.routes.length < 12) group.routes.push(finding.route);
    for (const sample of finding.samples || []) {
      const fingerprint = JSON.stringify(sample);
      if (!group.samples.some((entry) => JSON.stringify(entry) === fingerprint) && group.samples.length < 6) group.samples.push(sample);
    }
    if (finding.value !== undefined) group.value = finding.value;
    grouped.set(key, group);
  }
  const report = {
    auditDate: new Date().toISOString(),
    routesExpected: routes.length,
    routesVisited: routesVisited.size,
    viewports: widths,
    findings: [...grouped.values()],
    limitations: [
      "Le rendu MFA réel n’a pas été ouvert sans authentification et facteur TOTP configuré.",
      "L’arbre d’accessibilité Chromium a été inspecté; aucun lecteur d’écran n’a été piloté dans cette passe.",
      "720 px CSS sert de contrôle de reflow équivalent à une fenêtre desktop réduite; le zoom natif du navigateur n’a pas été simulé.",
    ],
  };
  const outputPath = path.join(__dirname, "accessibility-audit-latest.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ ...report, reportPath: outputPath }, null, 2));
  socket.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
