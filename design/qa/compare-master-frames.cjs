const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "../..");
const framesDir = path.join(root, "design", "master-frames", "exports-webp");
const qaDir = __dirname;
const outputDir = path.join(qaDir, "frame-review", "app-vs-reference");
const pairs = [
  ["MF-01 v3 · capture réelle", "GES-Admin-MF-01-login-default-v3.webp", "connexion-1440x1000.png"],
  ["MF-03", "GES-Admin-MF-03-command-center-empty.webp", "admin-vue-generale-1440x1000.png"],
  ["MF-04", "GES-Admin-MF-04-members-empty.webp", "admin-membres-1440x1000.png"],
  ["MF-05", "GES-Admin-MF-05-member-detail-empty.webp", "admin-membres-dossier-1440x1000.png"],
  ["MF-06", "GES-Admin-MF-06-kyc-queue-empty.webp", "admin-kyc-1440x1000.png"],
  ["MF-07", "GES-Admin-MF-07-kyc-case-empty.webp", "admin-kyc-dossier-1440x1000.png"],
  ["MF-08", "GES-Admin-MF-08-financial-overview-initial-v2.webp", "admin-vue-financiere-1440x1000.png"],
  ["MF-09", "GES-Admin-MF-09-treasury-empty.webp", "admin-tresorerie-1440x1000.png"],
  ["MF-10", "GES-Admin-MF-10-transactions-empty.webp", "admin-transactions-1440x1000.png"],
  ["MF-11", "GES-Admin-MF-11-transaction-detail-unavailable.webp", "admin-transactions-dossier-1440x1000.png"],
  ["MF-12", "GES-Admin-MF-12-deposits-withdrawals-empty.webp", "admin-depots-retraits-1440x1000.png"],
  ["MF-13", "GES-Admin-MF-13-ledger-reconciliation-empty.webp", "admin-grand-livre-1440x1000.png"],
  ["MF-14", "GES-Admin-MF-14-plans-empty.webp", "admin-plans-1440x1000.png"],
  ["MF-15 v2 · défaut", "GES-Admin-MF-15-plan-create-draft-default-v2.webp", "admin-plans-nouveau-default-1440x1100.png"],
  ["MF-16", "GES-Admin-MF-16-subscriptions-empty.webp", "admin-souscriptions-1440x1000.png"],
  ["MF-17", "GES-Admin-MF-17-subscription-detail-unavailable.webp", "admin-souscriptions-dossier-1440x1000.png"],
  ["MF-18", "GES-Admin-MF-18-contracts-empty.webp", "admin-contrats-1440x1000.png"],
  ["MF-19", "GES-Admin-MF-19-contract-detail-unavailable.webp", "admin-contrats-dossier-1440x1000.png"],
  ["MF-20", "GES-Admin-MF-20-maturities-empty.webp", "admin-echeances-1440x1000.png"],
  ["MF-21", "GES-Admin-MF-21-financing-empty-v2.webp", "admin-financements-1440x1000.png"],
  ["MF-22", "GES-Admin-MF-22-risks-alerts-empty.webp", "admin-risques-1440x1000.png"],
  ["MF-23", "GES-Admin-MF-23-incident-unavailable.webp", "admin-risques-incident-1440x1000.png"],
  ["MF-24", "GES-Admin-MF-24-support-tickets-empty.webp", "admin-support-1440x1000.png"],
  ["MF-25", "GES-Admin-MF-25-support-conversation-empty.webp", "admin-support-conversation-1440x1000.png"],
  ["MF-26", "GES-Admin-MF-26-documents-notifications-empty.webp", "admin-documents-1440x1000.png"],
  ["MF-27", "GES-Admin-MF-27-reports-empty.webp", "admin-rapports-1440x1000.png"],
  ["MF-28", "GES-Admin-MF-28-team-empty.webp", "admin-equipe-1440x1000.png"],
  ["MF-29", "GES-Admin-MF-29-roles-permissions-empty.webp", "admin-roles-permissions-1440x1000.png"],
  ["MF-30", "GES-Admin-MF-30-audit-empty.webp", "admin-audit-1440x1000.png"],
  ["MF-31", "GES-Admin-MF-31-settings-unavailable.webp", "admin-parametres-1440x1000.png"],
  ["MF-32", "GES-Admin-MF-32-flexicash-unavailable.webp", "admin-integrations-flexicash-1440x1000.png"],
  ["MF-33", "GES-Admin-MF-33-notifications-v2.webp", "admin-notifications-1440x1000.png"],
  ["MF-34", "GES-Admin-MF-34-interface-states-v2.webp", "admin-etats-interface-1440x1000.png"],
];

const width = 600;
const height = 390;
const labelHeight = 30;
const gap = 18;

(async () => {
  for (const [frame, reference, capture] of pairs) {
    for (const file of [path.join(framesDir, reference), path.join(qaDir, capture)]) {
      if (!fs.existsSync(file)) throw new Error(`Missing comparison input: ${file}`);
    }
  }
  fs.mkdirSync(outputDir, { recursive: true });
  for (let start = 0; start < pairs.length; start += 4) {
    const batch = pairs.slice(start, start + 4);
    const layers = [];
    for (let index = 0; index < batch.length; index++) {
      const [frame, reference, capture] = batch[index];
      const top = index * (height + labelHeight + gap);
      const title = Buffer.from(`<svg width="${width * 2}" height="${labelHeight}"><rect width="100%" height="100%" fill="#07161A"/><text x="10" y="20" fill="white" font-family="Arial" font-size="15">${frame} · référence à gauche / application à droite</text></svg>`);
      layers.push({ input: title, left: 0, top });
      const sources = [path.join(framesDir, reference), path.join(qaDir, capture)];
      for (let side = 0; side < sources.length; side++) {
        const image = await sharp(sources[side]).resize(width, height, { fit: "contain", background: "#f7f9fc" }).png().toBuffer();
        layers.push({ input: image, left: side * width, top: top + labelHeight });
      }
    }
    const sheetHeight = batch.length * (height + labelHeight + gap) - gap;
    const output = path.join(outputDir, `comparison-${String(Math.floor(start / 4) + 1).padStart(2, "0")}.png`);
    await sharp({ create: { width: width * 2, height: sheetHeight, channels: 3, background: "#eef1f4" } })
      .composite(layers)
      .png()
      .toFile(output);
    console.log(output);
  }
  console.log(`Compared ${pairs.length} frames; MF-02 awaits a real MFA session.`);
})();
