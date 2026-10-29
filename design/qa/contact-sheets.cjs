const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const sourceDir = path.join(__dirname, "..", "master-frames", "exports-webp");
const targetDir = path.join(__dirname, "frame-review");
const files = fs.readdirSync(sourceDir)
  .filter((name) => name.endsWith(".webp") && !name.includes("MF-00-") && !name.includes("MF-33-notifications-empty") && !name.includes("interface-states.webp"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const columns = 2;
const cellWidth = 800;
const cellHeight = 525;

(async () => {
  fs.mkdirSync(targetDir, { recursive: true });
  for (let start = 0; start < files.length; start += 4) {
    const batch = files.slice(start, start + 4);
    const layers = await Promise.all(batch.map(async (name, index) => {
      const left = (index % columns) * cellWidth;
      const top = Math.floor(index / columns) * cellHeight;
      const label = name.replace(/\.webp$/, "");
      const text = Buffer.from(`<svg width="${cellWidth}" height="38"><rect width="100%" height="100%" fill="#07161A"/><text x="12" y="25" fill="white" font-family="Arial" font-size="15">${label}</text></svg>`);
      const image = await sharp(path.join(sourceDir, name)).resize(cellWidth, cellHeight - 38, { fit: "contain", background: "#f7f9fc" }).png().toBuffer();
      return [
        { input: text, left, top },
        { input: image, left, top: top + 38 },
      ];
    }));
    const output = path.join(targetDir, `frames-${String(Math.floor(start / 4) + 1).padStart(2, "0")}.png`);
    await sharp({ create: { width: cellWidth * columns, height: cellHeight * Math.ceil(batch.length / columns), channels: 3, background: "#eef1f4" } })
      .composite(layers.flat())
      .png()
      .toFile(output);
    console.log(output);
  }
})();
