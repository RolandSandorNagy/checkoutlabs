#!/usr/bin/env node
/**
 * Generates server-rendered /hu/ and /de/ HTML from the English source pages,
 * using the same translation dictionary that i18n.js applies client-side
 * (so output matches what visitors already see, just baked in at build time).
 *
 * Run after editing index.html, about/index.html, or work/index.html:
 *   node scripts/build-locales.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_ORIGIN = "https://checkoutlabs.dev";

// ---- Load the hu/de dictionaries straight out of i18n.js (single source of truth) ----
const i18nSrc = fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8");
function extractDict(varName) {
  const start = i18nSrc.indexOf(`const ${varName} = {`);
  if (start === -1) throw new Error(`Could not find "${varName}" dictionary in i18n.js`);
  const braceStart = i18nSrc.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < i18nSrc.length; i++) {
    if (i18nSrc[i] === "{") depth++;
    else if (i18nSrc[i] === "}") {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  const objectLiteral = i18nSrc.slice(braceStart, end);
  // eslint-disable-next-line no-new-func
  return new Function(`return (${objectLiteral});`)();
}

const DICTS = { hu: extractDict("hu"), de: extractDict("de") };

// ---- Page registry: source file + per-language head metadata ----
const PAGES = [
  {
    key: "index",
    src: "index.html",
    urlPath: "/",
    outDir: { hu: "hu", de: "de" },
    meta: {
      en: {
        title: "CheckoutLabs - Senior Shopify Development for Agencies",
        description:
          "Senior Shopify development practice by Roland Nagy. White-label support for agencies and technical teams across custom apps, integrations, checkout customizations and advanced builds.",
      },
      hu: {
        title: "CheckoutLabs - Senior Shopify fejlesztés ügynökségeknek",
        description:
          "Senior Shopify fejlesztői praxis Roland Nagy vezetésével. White-label támogatás ügynökségeknek és technikai csapatoknak egyedi appokhoz, integrációkhoz, checkout testreszabásokhoz és haladó Shopify fejlesztésekhez.",
      },
      de: {
        title: "CheckoutLabs - Senior Shopify-Entwicklung für Agenturen",
        description:
          "Senior-Shopify-Entwicklungspraxis von Roland Nagy. White-Label-Unterstützung für Agenturen und technische Teams bei individuellen Apps, Integrationen, Checkout-Anpassungen und fortgeschrittenen Builds.",
      },
    },
  },
  {
    key: "about",
    src: "about/index.html",
    urlPath: "/about/",
    outDir: { hu: "hu/about", de: "de/about" },
    meta: {
      en: {
        title: "About Roland Nagy | CheckoutLabs",
        description:
          "About Roland Nagy, the senior Shopify and full-stack developer behind CheckoutLabs. Software engineering background, Shopify specialization, and ongoing MSc studies in Artificial Intelligence.",
      },
      hu: {
        title: "Roland Nagy - Senior Shopify fejlesztő | CheckoutLabs",
        description:
          "Roland Nagy, a CheckoutLabs mögötti senior Shopify és full-stack fejlesztő bemutatkozása. Szoftverfejlesztői háttér, Shopify specializáció és folyamatban lévő mesterséges intelligencia MSc tanulmányok.",
      },
      de: {
        title: "Roland Nagy - Senior Shopify-Entwickler | CheckoutLabs",
        description:
          "Über Roland Nagy, den Senior-Shopify- und Full-Stack-Entwickler hinter CheckoutLabs. Software-Engineering-Hintergrund, Shopify-Spezialisierung und laufendes MSc-Studium in Künstlicher Intelligenz.",
      },
    },
  },
  {
    key: "work",
    src: "work/index.html",
    urlPath: "/work/",
    outDir: { hu: "hu/work", de: "de/work" },
    meta: {
      en: {
        title: "Shopify Developer Portfolio | CheckoutLabs",
        description:
          "Selected Shopify and e-commerce development work by Roland Nagy, the senior developer behind CheckoutLabs. Custom Shopify functionality, integrations, configurators and ongoing development.",
      },
      hu: {
        title: "Shopify fejlesztői portfólió | CheckoutLabs",
        description:
          "Válogatott Shopify és e-commerce fejlesztési munkák Roland Nagy, a CheckoutLabs mögötti senior fejlesztő portfóliójából. Egyedi Shopify funkcionalitás, integrációk, konfigurátorok és folyamatos fejlesztés.",
      },
      de: {
        title: "Shopify-Entwickler-Portfolio | CheckoutLabs",
        description:
          "Ausgewählte Shopify- und E-Commerce-Entwicklungsarbeiten von Roland Nagy, dem Senior-Entwickler hinter CheckoutLabs. Individuelle Shopify-Funktionalität, Integrationen, Konfiguratoren und laufende Entwicklung.",
      },
    },
  },
];

const OG_LOCALE = { en: "en_US", hu: "hu_HU", de: "de_DE" };

// ---- Translation helpers (mirrors i18n.js translateTextNodes / translateAttributes) ----
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&copy;/g, "©")
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)));
}

function normalizeText(value) {
  return decodeEntities(value.replace(/\s+/g, " ").trim());
}

function translateBody(html, dict) {
  const skipTagsOpen = /^<(script|style|svg)[\s>]/i;
  const skipTagsClose = /^<\/(script|style|svg)>/i;

  const parts = html.split(/(<[^>]*>)/g);
  let skipDepth = 0;

  return parts
    .map((part) => {
      if (part.startsWith("<")) {
        if (skipTagsOpen.test(part) && !part.endsWith("/>")) skipDepth++;
        else if (skipTagsClose.test(part)) skipDepth = Math.max(0, skipDepth - 1);

        // Translate placeholder / aria-label / title attributes (raw-value lookup, like i18n.js)
        return part.replace(
          /(placeholder|aria-label|title)="([^"]*)"/g,
          (full, attr, value) => {
            const translated = dict[decodeEntities(value)];
            return translated ? `${attr}="${translated}"` : full;
          }
        );
      }

      if (skipDepth > 0) return part;
      if (!normalizeText(part)) return part;

      const leading = part.match(/^\s*/)[0];
      const trailing = part.match(/\s*$/)[0];
      const key = normalizeText(part);
      const translated = dict[key];
      return translated ? `${leading}${translated}${trailing}` : part;
    })
    .join("");
}

function buildLocalizedPath(lang, pathname) {
  const base = pathname.replace(/^\/(hu|de)(\/.*)?$/, (_m, _l, rest) => rest || "/");
  if (lang === "en") return base;
  return `/${lang}${base === "/" ? "/" : base}`;
}

function localizeHref(href, lang) {
  if (!href || href.startsWith("#")) return href;
  if (/^(mailto:|tel:|https?:\/\/)/i.test(href)) return href;

  let cut = href.length;
  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  if (hashIndex !== -1) cut = Math.min(cut, hashIndex);
  if (queryIndex !== -1) cut = Math.min(cut, queryIndex);

  const pathname = href.slice(0, cut) || "/";
  const rest = href.slice(cut);
  return buildLocalizedPath(lang, pathname) + rest;
}

function localizeLinks(html, lang) {
  return html.replace(/<a\b[^>]*>/gi, (tag) =>
    tag.replace(/href="([^"]*)"/, (full, href) => `href="${localizeHref(href, lang)}"`)
  );
}

function localizeLanguageSwitcher(html, lang) {
  const pressed = (code) => (code === lang ? ' is-active" aria-pressed="true' : '" aria-pressed="false');
  return html.replace(
    /<button class="language-option" type="button" data-language="(en|hu|de)">/g,
    (full, code) => `<button class="language-option${pressed(code)}" type="button" data-language="${code}">`
  );
}

// ---- Head metadata swap (exact-string replace, scoped to <head>) ----
function localizeHead(html, page, lang) {
  const en = page.meta.en;
  const target = page.meta[lang];
  const enSelfPath = page.urlPath;
  const targetSelfPath = buildLocalizedPath(lang, enSelfPath);

  let out = html;
  out = out.replace('<html lang="en">', `<html lang="${lang}">`);
  out = out.replace(`<title>${en.title}</title>`, `<title>${target.title}</title>`);
  out = out.replace(
    `<meta name="description" content="${en.description}" />`,
    `<meta name="description" content="${target.description}" />`
  );
  out = out.replace(
    `<link rel="canonical" href="${SITE_ORIGIN}${enSelfPath}" />`,
    `<link rel="canonical" href="${SITE_ORIGIN}${targetSelfPath}" />`
  );
  out = out.replace(
    `<meta property="og:locale" content="${OG_LOCALE.en}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`
  );
  out = out.replace(
    `<meta property="og:url" content="${SITE_ORIGIN}${enSelfPath}" />`,
    `<meta property="og:url" content="${SITE_ORIGIN}${targetSelfPath}" />`
  );
  out = out.replace(
    `<meta property="og:title" content="${en.title}" />`,
    `<meta property="og:title" content="${target.title}" />`
  );
  out = out.replace(
    `<meta property="og:description" content="${en.description}" />`,
    `<meta property="og:description" content="${target.description}" />`
  );
  out = out.replace(
    `<meta name="twitter:title" content="${en.title}" />`,
    `<meta name="twitter:title" content="${target.title}" />`
  );
  out = out.replace(
    `<meta name="twitter:description" content="${en.description}" />`,
    `<meta name="twitter:description" content="${target.description}" />`
  );
  // JSON-LD "url" fields should follow the localized canonical too
  out = out.replace(
    new RegExp(`"url": "${SITE_ORIGIN}${enSelfPath}"`, "g"),
    `"url": "${SITE_ORIGIN}${targetSelfPath}"`
  );

  // JSON-LD description fields (index + about pages only)
  out = out.replace(`"description": "${en.description}",`, `"description": "${target.description}",`);
  out = out.replace(
    `"description": "Senior Shopify and full-stack developer behind CheckoutLabs, with a computer science background and ongoing MSc studies in Artificial Intelligence.",`,
    lang === "hu"
      ? `"description": "Senior Shopify és full-stack fejlesztő a CheckoutLabs mögött, programtervező informatikus háttérrel és folyamatban lévő mesterséges intelligencia MSc tanulmányokkal.",`
      : `"description": "Senior-Shopify- und Full-Stack-Entwickler hinter CheckoutLabs, mit Informatik-Hintergrund und laufendem MSc-Studium in Künstlicher Intelligenz.",`
  );

  return out;
}

// ---- Main ----
for (const page of PAGES) {
  const srcPath = path.join(ROOT, page.src);
  const srcHtml = fs.readFileSync(srcPath, "utf8");
  const bodyStart = srcHtml.indexOf("<body");

  for (const lang of ["hu", "de"]) {
    let html = localizeHead(srcHtml, page, lang);

    const head = html.slice(0, bodyStart);
    let body = html.slice(bodyStart);

    body = translateBody(body, DICTS[lang]);
    body = localizeLinks(body, lang);
    body = localizeLanguageSwitcher(body, lang);

    html = head + body;

    const outDir = path.join(ROOT, page.outDir[lang]);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, "index.html");
    fs.writeFileSync(outPath, html, "utf8");
    console.log(`wrote ${path.relative(ROOT, outPath)}`);
  }
}
