#!/usr/bin/env node
/**
 * Generates lightweight "share stub" pages per case study, e.g. /work/yoza/,
 * /hu/work/yoza/, /de/work/yoza/. Each stub has correct per-project
 * <title>/description/OG/Twitter tags (so social previews show the right
 * screenshot instead of the generic /work/ page image), is marked noindex
 * (the real, indexed content lives on /work/), and instantly redirects real
 * visitors to /work/#slug via JS. Crawlers (LinkedIn, Slack, etc.) don't run
 * JS, so they read the static per-project meta tags instead.
 *
 *   node scripts/build-project-pages.js
 */
const fs = require("fs");
const path = require("path");
const { hu, de } = require("./translations.js");

const ROOT = path.join(__dirname, "..");
const SITE_ORIGIN = "https://checkoutlabs.dev";
const DICTS = { hu, de };
const OG_LOCALE = { en: "en_US", hu: "hu_HU", de: "de_DE" };
const LANG_PREFIX = { en: "", hu: "/hu", de: "/de" };

const PROJECTS = [
  {
    slug: "pennywell-farm",
    kicker: "Pennywell Farm",
    title: "Shopify Ticketing Platform Migration & Booking Flow",
    description:
      "Shopify ticketing work for Pennywell Farm focused on making a complex attraction booking journey easier to buy and easier to operate inside Shopify. The work moved a custom ticketing platform onto Shopify, preserved the storefront during launch, then introduced a unified booking flow for day tickets, event tickets, season-ticket-holder reservations, and annual passes. Later work focused on stabilizing the supporting app ecosystem and live ticketing operations.",
    image: "/assets/screenshots/optimized/pennywell-homepage-desktop-2.webp",
    imageWidth: 1917,
    imageHeight: 945,
  },
  {
    slug: "yoza",
    kicker: "YOZA",
    title: "Custom 3D Configurator Shopify Integration",
    description:
      "Shopify integration work for a configurable furniture product where 3D choices needed to become reliable Shopify cart and order data. The implementation connected configurator selections with products, variants, BOM-style component line items, saved configuration links, Shopify Markets, shipping profiles, and Hungarian localization.",
    image: "/assets/screenshots/optimized/yoza-homepage-desktop.webp",
    imageWidth: 1200,
    imageHeight: 591,
  },
  {
    slug: "bramley-for-business",
    kicker: "Bramley for Business",
    title: "Custom B2B Shopify Commerce",
    description:
      "Custom B2B commerce implementation for Bramley for Business, built without Shopify Plus native B2B. The work used Shopify-native primitives, Liquid, JavaScript, variants, metafields, metaobjects, and theme logic to support business purchasing rules inside a maintainable storefront.",
    image: "/assets/screenshots/optimized/bramley-b2b-storefront.webp",
    imageWidth: 1891,
    imageHeight: 940,
  },
  {
    slug: "edenmoor",
    kicker: "Edenmoor, formerly Pipers Farm",
    title: "Checkout UI Extension for Delivery Date Selection",
    description:
      "Checkout customization for Edenmoor, formerly Pipers Farm, where delivery date selection needed to happen inside Shopify checkout because postcode, cart contents, and shipping methods determine what dates are valid. The Checkout UI Extension used React, Remix, Node.js, and Shopify UI Extensions, with validation that could block checkout until a valid delivery date was selected.",
    image: "/assets/screenshots/optimized/edenmoor-homepage-desktop.webp",
    imageWidth: 1200,
    imageHeight: 591,
  },
  {
    slug: "bramley-products",
    kicker: "Bramley Products",
    title: "Shopify Storefront Redesign & Custom Search",
    description:
      "Storefront and theme work for the Bramley B2C Shopify store, delivered through an agency team across several redesigns, product-page improvements, ongoing storefront updates, and custom JavaScript search/filtering before Shopify Search & Discovery was available.",
    image: "/assets/screenshots/optimized/bramley-products-homepage-desktop.webp",
    imageWidth: 1916,
    imageHeight: 938,
  },
  {
    slug: "ormonde-jayne",
    kicker: "Ormonde Jayne",
    title: "Shopify Storefront Redesign & Store Finder",
    description:
      "Shopify storefront implementation for Ormonde Jayne, delivered through an agency team from Figma designs into a production theme. The work translated a premium brand experience into Shopify, with full-store frontend build-out, performance improvements, ongoing UI refinements, and a custom store finder using Shopify content data and JavaScript.",
    image: "/assets/screenshots/optimized/ormondejayne-homepage-desktop.webp",
    imageWidth: 1200,
    imageHeight: 595,
  },
  {
    slug: "facetheory",
    kicker: "FaceTheory",
    title: "Multi-language Shopify Storefront Development",
    description:
      "Shopify storefront development for FaceTheory through an agency team, working in a complex multi-language setup where localized storefronts were maintained in separate repositories. The work focused on keeping frontend implementation, production fixes, UI refinements, and Core Web Vitals improvements consistent across a difficult storefront environment.",
    image: "/assets/screenshots/optimized/facetheory-homepage-desktop.webp",
    imageWidth: 1200,
    imageHeight: 589,
  },
  {
    slug: "malone-souliers",
    kicker: "Malone Souliers",
    title: "Made-to-Order Shopify Configurator App",
    description:
      "Archived Shopify build for Malone Souliers combining storefront redesign work with a custom made-to-order shoe configurator. The configurator supported a richer product decision flow with admin-managed shoe parts, materials, colours, swatches, and imagery, while Shopify carried selected configuration details through product, cart, and checkout using line item properties.",
    image: "/assets/screenshots/optimized/malone-homepage-desktop.webp",
    imageWidth: 1600,
    imageHeight: 784,
  },
  {
    slug: "bird-eyewear",
    kicker: "Bird Eyewear",
    title: "Guided Frame Finder Quiz & Storefront",
    description:
      "Shopify frontend and UI implementation work for an eyewear storefront, including a guided Frame Finder quiz that recommends frames from multiple customer inputs - what the shopper is looking for, style preference, and fit details - before narrowing the catalog down to a small set of matched products.",
    image: "/assets/screenshots/optimized/bird-homepage-desktop.webp",
    imageWidth: 1917,
    imageHeight: 943,
  },
  {
    slug: "the-boxspring-club",
    kicker: "The Boxspring Club",
    title: "3D Bed Configurator Stabilization",
    description:
      'Shopify storefront fixes and stabilization work around an existing 3D bed configurator, where shoppers choose size, fabric, headboard width, and per-side mattress hardness with a live-updating 3D render and an AR "view in your room" option, before the selected components are added to cart as separate line items.',
    image: "/assets/screenshots/optimized/boxspring-homepage-desktop.webp",
    imageWidth: 1200,
    imageHeight: 591,
  },
];

const UI_STRINGS = {
  en: { viewFull: "View full case study →", redirecting: "Redirecting to the full case study…" },
  hu: { viewFull: "Teljes case study megtekintése →", redirecting: "Átirányítás a teljes case studyhoz…" },
  de: { viewFull: "Vollständige Case Study ansehen →", redirecting: "Weiterleitung zur vollständigen Case Study…" },
};

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function t(lang, en) {
  if (lang === "en") return en;
  const dict = DICTS[lang];
  return dict[en] || en;
}

function localizedPath(lang, targetPath) {
  return `${LANG_PREFIX[lang]}${targetPath}`;
}

function buildPage(project, lang) {
  const kicker = project.kicker; // proper noun, not translated
  const title = t(lang, project.title);
  const description = t(lang, project.description);
  const pageTitle = `${title} | CheckoutLabs`;
  const selfPath = localizedPath(lang, `/work/${project.slug}/`);
  const redirectTarget = `${localizedPath(lang, "/work/")}#${project.slug}`;
  const imageUrl = `${SITE_ORIGIN}${project.image}`;
  const ui = UI_STRINGS[lang];

  const titleHtml = escapeHtml(title);
  const kickerHtml = escapeHtml(kicker);
  const descriptionHtml = escapeHtml(description);
  const pageTitleAttr = escapeAttr(pageTitle);
  const descriptionAttr = escapeAttr(description);
  const redirectTargetAttr = escapeAttr(redirectTarget);

  const hreflangLinks = ["en", "hu", "de"]
    .map(
      (l) =>
        `  <link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}${localizedPath(l, `/work/${project.slug}/`)}" />`
    )
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="/assets/checkoutlabs-logo-icon.png">
  <title>${titleHtml} | CheckoutLabs</title>
  <meta name="description" content="${descriptionAttr}" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${SITE_ORIGIN}${selfPath}" />
${hreflangLinks}
  <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/work/${project.slug}/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CheckoutLabs" />
  <meta property="og:locale" content="${OG_LOCALE[lang]}" />
  <meta property="og:url" content="${SITE_ORIGIN}${selfPath}" />
  <meta property="og:title" content="${pageTitleAttr}" />
  <meta property="og:description" content="${descriptionAttr}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="${project.imageWidth}" />
  <meta property="og:image:height" content="${project.imageHeight}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitleAttr}" />
  <meta name="twitter:description" content="${descriptionAttr}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <link rel="stylesheet" href="/styles.css" />
  <style>
    .share-stub{min-height:100vh; display:flex; align-items:center; justify-content:center; padding:32px}
    .share-stub-card{max-width:560px; background:#fff; border:1px solid #DCE6F8; border-radius:20px; box-shadow:var(--shadow); padding:28px; text-align:center}
    .share-stub-card img{width:100%; border-radius:12px; margin-bottom:18px; border:1px solid #DCE6F8}
    .share-stub-kicker{color:var(--primary2); font-weight:800; font-size:12px; letter-spacing:.06em; text-transform:uppercase; margin-bottom:6px}
    .share-stub-card h1{font-size:22px; margin:0 0 10px}
    .share-stub-card p{color:var(--muted); font-size:14px; line-height:1.6; margin:0 0 20px}
    .share-stub-note{margin-top:14px; font-size:12px; color:var(--muted2)}
  </style>
  <script>location.replace(${JSON.stringify(redirectTarget)});</script>
</head>
<body>
  <div class="share-stub">
    <div class="share-stub-card">
      <img src="${project.image}" width="${project.imageWidth}" height="${project.imageHeight}" alt="" />
      <div class="share-stub-kicker">${kickerHtml}</div>
      <h1>${titleHtml}</h1>
      <p>${descriptionHtml}</p>
      <a class="btn btn-primary" href="${redirectTargetAttr}">${escapeHtml(ui.viewFull)}</a>
      <div class="share-stub-note">${escapeHtml(ui.redirecting)}</div>
    </div>
  </div>
</body>
</html>
`;
}

for (const project of PROJECTS) {
  for (const lang of ["en", "hu", "de"]) {
    const outDir = path.join(ROOT, lang === "en" ? "work" : `${lang}/work`, project.slug);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, "index.html");
    fs.writeFileSync(outPath, buildPage(project, lang), "utf8");
    console.log(`wrote ${path.relative(ROOT, outPath)}`);
  }
}
