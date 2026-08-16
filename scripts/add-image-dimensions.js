#!/usr/bin/env node
/**
 * Adds width/height (from real file dimensions) and loading="lazy" to <img>
 * tags across the English source pages, to reduce layout shift and defer
 * below-the-fold image loads. Run before scripts/build-locales.js so the
 * hu/de pages inherit the same attributes.
 *
 *   node scripts/add-image-dimensions.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function readUInt24LE(buf, offset) {
  return buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16);
}

function getPngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function getGifSize(buf) {
  if (buf.toString("ascii", 0, 3) !== "GIF") return null;
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
}

function getJpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let pos = 2;
  while (pos < buf.length) {
    if (buf[pos] !== 0xff) { pos++; continue; }
    const marker = buf[pos + 1];
    if (marker === 0xd8 || marker === 0xd9) { pos += 2; continue; }
    if (marker >= 0xd0 && marker <= 0xd7) { pos += 2; continue; }
    const segmentLength = buf.readUInt16BE(pos + 2);
    const isSOF =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSOF) {
      return { height: buf.readUInt16BE(pos + 5), width: buf.readUInt16BE(pos + 7) };
    }
    pos += 2 + segmentLength;
  }
  return null;
}

function getWebpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const fourCC = buf.toString("ascii", 12, 16);
  const data = buf.subarray(20);
  if (fourCC === "VP8 ") {
    return { width: data.readUInt16LE(6) & 0x3fff, height: data.readUInt16LE(8) & 0x3fff };
  }
  if (fourCC === "VP8L") {
    const bits = data.readUInt32LE(1);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (fourCC === "VP8X") {
    return { width: readUInt24LE(data, 4) + 1, height: readUInt24LE(data, 7) + 1 };
  }
  return null;
}

function getImageSize(filePath) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return getPngSize(buf);
  if (ext === ".gif") return getGifSize(buf);
  if (ext === ".jpg" || ext === ".jpeg") return getJpegSize(buf);
  if (ext === ".webp") return getWebpSize(buf);
  return null;
}

// Above-the-fold hero visuals (matched against the <img> tag's own src/class):
// keep eager + high fetch priority instead of lazy.
const EAGER_MARKERS = ["pennywell-homepage-desktop-2.webp", "profile-portrait"];
// Tiny brand/logo icons: leave loading unset (default eager) either way, no need to hint.
const NEUTRAL_MARKERS = ["brand-icon"];

const PAGES = ["index.html", "about/index.html", "work/index.html"];
const sizeCache = new Map();
let injected = 0, lazyAdded = 0, skippedMissing = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page);
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    const srcMatch = tag.match(/\ssrc="([^"]+)"/);
    if (!srcMatch) return tag;
    const src = srcMatch[1];
    if (!src.startsWith("/assets/")) return tag;

    let updated = tag;

    if (!/\swidth="/.test(tag)) {
      const assetPath = path.join(ROOT, src.replace(/^\//, ""));
      let size = sizeCache.get(assetPath);
      if (size === undefined) {
        try {
          size = fs.existsSync(assetPath) ? getImageSize(assetPath) : null;
        } catch (e) {
          size = null;
        }
        sizeCache.set(assetPath, size);
      }
      if (size) {
        updated = updated.replace(
          /\ssrc="[^"]+"/,
          (m) => `${m} width="${size.width}" height="${size.height}"`
        );
        injected++;
      } else {
        skippedMissing++;
      }
    }

    if (!/\sloading="/.test(updated)) {
      const isEager = EAGER_MARKERS.some((marker) => updated.includes(marker));
      const isNeutral = NEUTRAL_MARKERS.some((marker) => updated.includes(marker));
      if (isEager) {
        updated = updated.replace(/\ssrc="/, ` fetchpriority="high" src="`);
      } else if (!isNeutral) {
        updated = updated.replace(/\ssrc="/, ` loading="lazy" decoding="async" src="`);
        lazyAdded++;
      }
    }

    return updated;
  });

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`updated ${page}`);
}

console.log(`\nwidth/height injected: ${injected}`);
console.log(`loading="lazy" added: ${lazyAdded}`);
if (skippedMissing) console.log(`could not read dimensions for: ${skippedMissing} image(s)`);
