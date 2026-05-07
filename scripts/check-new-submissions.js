#!/usr/bin/env node
// Checks for new submissions in the CLARIN Iceland repository by testing
// handle numbers sequentially above the last known one.
// Updates scripts/repo-state.json if new handles are found.
// Writes a Markdown report to new-submissions-report.md.

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = resolve(__dirname, "repo-state.json");
const REPORT_FILE = resolve(__dirname, "../new-submissions-report.md");
const HANDLE_BASE = "https://repository.clarin.is/repository/xmlui/handle/20.500.12537";

const state = JSON.parse(readFileSync(STATE_FILE, "utf-8"));
const lastKnown = state.lastKnownHandle;

console.log(`Last known handle: ${lastKnown}`);
console.log("Checking for new handles...");

const newItems = [];
let n = lastKnown + 1;

while (true) {
    const url = `${HANDLE_BASE}/${n}`;
    let res;
    try {
        res = await fetch(url, {
            redirect: "follow",
            headers: { "User-Agent": "malbankinn-submission-checker/1.0" },
            signal: AbortSignal.timeout(15000),
        });
    } catch (e) {
        console.warn(`  ${n}: fetch error — ${e.message}, stopping.`);
        break;
    }

    if (res.status === 404) {
        console.log(`  ${n}: 404 — no more new handles.`);
        break;
    }

    if (res.ok) {
        // Extract title from the HTML page
        const html = await res.text();
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        const title = titleMatch
            ? titleMatch[1].replace(/\s*[–-]\s*CLARIN.*$/i, "").trim()
            : "(unknown title)";
        console.log(`  ${n}: NEW — ${title}`);
        newItems.push({ handle: n, title, url });
        n++;
    } else {
        // Unexpected status — skip and continue
        console.warn(`  ${n}: HTTP ${res.status}, skipping.`);
        n++;
        if (n > lastKnown + 50) break; // safety limit
    }
}

// Build report
const lines = [];
if (newItems.length === 0) {
    lines.push("No new submissions since last check (handle " + lastKnown + ").");
} else {
    lines.push(`## New CLARIN Iceland repository submissions`);
    lines.push("");
    lines.push(
        `${newItems.length} new item(s) found above handle ${lastKnown}. ` +
        `These may need to be added to \`repo_items_v2.json\` with descriptions and categories.`
    );
    lines.push("");
    for (const item of newItems) {
        lines.push(`- **${item.title}**`);
        lines.push(`  ${item.url}`);
    }
    lines.push("");
    lines.push(`_Last known handle updated to: ${newItems.at(-1).handle}_`);
    lines.push("");
    lines.push(`## Internal HTML pages to check`);
    lines.push("");
    lines.push("These pages contain hardcoded CLARIN handles and may need manual updating:");
    lines.push("");
    for (const page of state.internalPagesToCheck || []) {
        lines.push(`- \`${page.file}\` — currently links to handle **/${page.handle}** (${page.description})`);
    }

    // Update state file
    state.lastKnownHandle = newItems.at(-1).handle;
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 4) + "\n", "utf-8");
    console.log(`\nUpdated lastKnownHandle to ${state.lastKnownHandle}`);
}

const report = lines.join("\n");
writeFileSync(REPORT_FILE, report, "utf-8");
console.log("Report written to new-submissions-report.md");

// Signal to the workflow whether there are new items
process.exit(newItems.length > 0 ? 1 : 0);
