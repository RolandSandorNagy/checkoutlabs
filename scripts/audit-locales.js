#!/usr/bin/env node
// One-off audit: list body text segments in the EN source pages that have
// no matching hu/de dictionary entry, so they will render untranslated.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const i18nSrc = fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8");
function extractDict(varName) {
  const start = i18nSrc.indexOf(`const ${varName} = {`);
  const braceStart = i18nSrc.indexOf("{", start);
  let depth = 0, end = -1;
  for (let i = braceStart; i < i18nSrc.length; i++) {
    if (i18nSrc[i] === "{") depth++;
    else if (i18nSrc[i] === "}") { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return new Function(`return (${i18nSrc.slice(braceStart, end)});`)();
}
const hu = extractDict("hu");
const de = extractDict("de");

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/&copy;/g, "©")
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)));
}
function normalizeText(value) {
  return decodeEntities(value.replace(/\s+/g, " ").trim());
}

const PAGES = ["index.html", "about/index.html", "work/index.html"];
const skipTagsOpen = /^<(script|style|svg)[\s>]/i;
const skipTagsClose = /^<\/(script|style|svg)>/i;

// Things that are fine to stay in English (brand/product/tech names, proper nouns)
const ALLOWLIST = new Set([
  "CheckoutLabs", "Roland Nagy", "Shopify", "Liquid", "JavaScript", "TypeScript",
  "React", "Node.js", "Remix", "GraphQL", "MongoDB", "GitHub", "API", "Admin API",
  "Checkout UI", "PHP", "MailerLite", "PassKit", "Fullstory Marketing Ltd.",
  "EN", "HU", "DE",
]);

for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");
  const body = html.slice(html.indexOf("<body"));
  const parts = body.split(/(<[^>]*>)/g);
  let skipDepth = 0;
  const missing = new Set();

  for (const part of parts) {
    if (part.startsWith("<")) {
      if (skipTagsOpen.test(part) && !part.endsWith("/>")) skipDepth++;
      else if (skipTagsClose.test(part)) skipDepth = Math.max(0, skipDepth - 1);
      continue;
    }
    if (skipDepth > 0) continue;
    const key = normalizeText(part);
    if (!key || key.length < 3) continue;
    if (ALLOWLIST.has(key)) continue;
    if (!/[a-zA-Z]/.test(key)) continue;
    if (!hu[key]) missing.add(`[HU] ${key}`);
    if (!de[key]) missing.add(`[DE] ${key}`);
  }

  if (missing.size) {
    console.log(`\n=== ${page} (${missing.size} untranslated) ===`);
    [...missing].forEach((m) => console.log(" - " + m));
  } else {
    console.log(`\n=== ${page}: fully covered ===`);
  }
}
