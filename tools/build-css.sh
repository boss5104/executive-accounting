#!/usr/bin/env bash
# คอมไพล์ Tailwind CSS แล้วฝังลงใน index.html (ระหว่าง /*TW-START*/ ... /*TW-END*/)
# ใช้: bash tools/build-css.sh   (ต้องมี Node.js)
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
printf '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' > "$tmp/in.css"
npx --yes tailwindcss@3.4.17 -c tailwind.config.js -i "$tmp/in.css" -o "$tmp/out.css" --minify >/dev/null 2>&1
node -e '
const fs = require("fs");
const css = fs.readFileSync(process.argv[1], "utf8").replace(/<\/style/gi, "<\\/style");
let html = fs.readFileSync("index.html", "utf8");
const re = /\/\*TW-START\*\/[\s\S]*?\/\*TW-END\*\//;
if (!re.test(html)) { console.error("ไม่พบตำแหน่ง /*TW-START*/ ใน index.html"); process.exit(1); }
html = html.replace(re, () => "/*TW-START*/" + css + "/*TW-END*/");
fs.writeFileSync("index.html", html);
console.log("Tailwind CSS: " + (css.length / 1024).toFixed(1) + " KB");
' "$tmp/out.css"
rm -rf "$tmp"
