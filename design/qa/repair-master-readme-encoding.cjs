const fs = require("node:fs");
const { TextDecoder } = require("node:util");

const file = "design/master-frames/README.md";
const windows1252 = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);
const decoder = new TextDecoder("utf-8", { fatal: true });
const source = fs.readFileSync(file, "utf8");
let repairedTokens = 0;

let result = source.replace(/\S+/g, (token) => {
  if (!/[ÃâÂ]/u.test(token)) return token;
  const bytes = [];
  for (const character of token) {
    const point = character.codePointAt(0);
    if (point <= 0x7f || (point >= 0xa0 && point <= 0xff)) bytes.push(point);
    else if (windows1252.has(point)) bytes.push(windows1252.get(point));
    else return token;
  }
  try {
    const decoded = decoder.decode(Uint8Array.from(bytes));
    if ((decoded.match(/[ÃâÂ]/gu) ?? []).length >= (token.match(/[ÃâÂ]/gu) ?? []).length) return token;
    repairedTokens += 1;
    return decoded;
  } catch {
    return token;
  }
});
result = result.replaceAll("Ã ", "à").replaceAll("tÃ¢ches", "tâches");

fs.writeFileSync(file, result, "utf8");
const remaining = (result.match(/Ã|â€|Â/gu) ?? []).length;
console.log(`Repaired ${repairedTokens} tokens in ${file}; remaining mojibake markers: ${remaining}.`);
