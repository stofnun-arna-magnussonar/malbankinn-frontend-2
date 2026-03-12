#!/usr/bin/env node
// Checks all "repo" type URLs in repo_items JSON files for replacement notices.
// If a URL has been superseded, updates it to the new URL and saves the file.
// Exits with code 1 if any changes were made (so CI can detect and create a PR).

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../src/data");

const FILES = ["repo_items.json", "repo_items_v2.json"];
const REPLACEMENT_RE =
  /replaced by a newer submission[^<]*<a[^>]+href="([^"]+)"/i;

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "malbankinn-url-checker/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    return await res.text();
  } catch (e) {
    console.warn(`  Failed to fetch ${url}: ${e.message}`);
    return null;
  }
}

function extractReplacementUrl(html) {
  const match = html.match(REPLACEMENT_RE);
  return match ? match[1] : null;
}

async function processFile(filename) {
  const filepath = resolve(DATA_DIR, filename);
  const data = JSON.parse(readFileSync(filepath, "utf-8"));
  let changed = false;

  for (const [key, item] of Object.entries(data)) {
    if (!Array.isArray(item.url)) continue;
    for (const urlEntry of item.url) {
      if (urlEntry.type !== "repo") continue;

      console.log(`Checking [${key}]: ${urlEntry.url}`);
      const html = await fetchPage(urlEntry.url);
      if (!html) continue;

      const newUrl = extractReplacementUrl(html);
      if (newUrl && newUrl !== urlEntry.url) {
        console.log(`  → Replaced: ${urlEntry.url}`);
        console.log(`  → New URL:  ${newUrl}`);
        urlEntry.url = newUrl;
        changed = true;
      }
    }
  }

  if (changed) {
    writeFileSync(filepath, JSON.stringify(data, null, 4) + "\n", "utf-8");
    console.log(`Saved changes to ${filename}`);
  }

  return changed;
}

const results = await Promise.all(FILES.map(processFile));
const anyChanged = results.some(Boolean);

if (anyChanged) {
  console.log("\nChanges detected. Exiting with code 1 to trigger PR creation.");
  process.exit(1);
} else {
  console.log("\nNo replacements found.");
}
