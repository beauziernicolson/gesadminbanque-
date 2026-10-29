const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const [referencePath, applicationPath, outputPath, label = "Application mobile"] = process.argv.slice(2);
if (!referencePath || !applicationPath || !outputPath) {
  throw new Error("Usage: node compare-mobile-route.cjs reference.webp application.png comparison.png [label]");
}

const width = 390;
const height = 844;
const header = 28;

(async () => {
  for (const file of [referencePath, applicationPath]) {
    if (!fs.existsSync(file)) throw new Error(`Missing comparison input: ${file}`);
  }
  const title = Buffer.from(`<svg width="${width * 2}" height="${header}"><rect width="100%" height="100%" fill="#07161A"/><text x="10" y="19" fill="white" font-family="Arial" font-size="12">Référence MF-10</text><text x="${width + 10}" y="19" fill="white" font-family="Arial" font-size="12">${label}</text></svg>`);
  const [reference, application] = await Promise.all([
    sharp(referencePath).resize(width, height, { fit: "contain", background: "#f7f9fc" }).png().toBuffer(),
    sharp(applicationPath).resize(width, height, { fit: "contain", background: "#f7f9fc" }).png().toBuffer(),
  ]);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp({ create: { width: width * 2, height: height + header, channels: 3, background: "#f7f9fc" } })
    .composite([{ input: title, left: 0, top: 0 }, { input: reference, left: 0, top: header }, { input: application, left: width, top: header }])
    .png()
    .toFile(outputPath);
  console.log(outputPath);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
