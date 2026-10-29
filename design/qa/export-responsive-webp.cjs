const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const [source, destination] = process.argv.slice(2);
if (!source || !destination) throw new Error("Usage: export-responsive-webp.cjs source.png destination.webp");

(async () => {
  if (!fs.existsSync(source)) throw new Error(`Missing source image: ${source}`);
  const metadata = await sharp(source).metadata();
  await fs.promises.mkdir(path.dirname(destination), { recursive: true });
  await sharp(source).webp({ quality: 92, effort: 6 }).toFile(destination);
  const output = await sharp(destination).metadata();
  if (output.format !== "webp" || output.width !== metadata.width || output.height !== metadata.height) {
    throw new Error(`Export dimensions or format changed: ${JSON.stringify({ metadata, output })}`);
  }
  console.log(JSON.stringify({ source, destination, width: output.width, height: output.height, bytes: fs.statSync(destination).size }));
})();
