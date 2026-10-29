const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const sourceDir = __dirname;
const targetDir = path.join(sourceDir, "frame-review");
const files = fs.readdirSync(sourceDir)
  .filter((name) => /^admin-.+-1440x1000\.png$/.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const columns = 4;
const cellWidth = 360;
const imageHeight = 250;
const labelHeight = 24;
const cellHeight = imageHeight + labelHeight;

(async () => {
  fs.mkdirSync(targetDir, { recursive: true });
  for (let start = 0; start < files.length; start += 16) {
    const batch = files.slice(start, start + 16);
    const layers = await Promise.all(batch.map(async (name, index) => {
      const left = (index % columns) * cellWidth;
      const top = Math.floor(index / columns) * cellHeight;
      const text = Buffer.from(`<svg width="${cellWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#07161A"/><text x="8" y="16" fill="white" font-family="Arial" font-size="10">${name.replace(/\.png$/, "")}</text></svg>`);
      const image = await sharp(path.join(sourceDir, name)).resize(cellWidth, imageHeight, { fit: "contain", background: "#f7f9fc" }).png().toBuffer();
      return [{ input: text, left, top }, { input: image, left, top: top + labelHeight }];
    }));
    const sheetHeight = Math.ceil(batch.length / columns) * cellHeight;
    const output = path.join(targetDir, `app-desktop-${String(Math.floor(start / 16) + 1).padStart(2, "0")}.png`);
    await sharp({ create: { width: columns * cellWidth, height: sheetHeight, channels: 3, background: "#eef1f4" } })
      .composite(layers.flat())
      .png()
      .toFile(output);
    console.log(output);
  }
})();
