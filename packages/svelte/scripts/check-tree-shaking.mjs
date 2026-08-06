// Guards the library's tree-shaking claim. Granular subpath exports
// (`@neobr/svelte/button`) only help consumers if a component entry never
// imports the root barrel (`dist/index.js`). Such an import would pull the
// entire library into any subpath import, defeating tree-shaking.
//
// Run after `pnpm build` (needs `dist/`).

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(packageRoot, "dist");
const barrelPath = resolve(distRoot, "index.js");

const importRe = /import\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;

const violations = [];

function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full);
        } else if (entry.name.endsWith(".js") || entry.name.endsWith(".svelte")) {
            scanFile(full);
        }
    }
}

function scanFile(file) {
    const source = readFileSync(file, "utf8");
    let m;
    while ((m = importRe.exec(source))) {
        const spec = m[1];
        if (!spec.startsWith(".")) continue; // bare/builtin imports are fine
        const resolved = resolve(dirname(file), spec);
        if (resolved === barrelPath) {
            violations.push(file);
        }
    }
}

if (!existsSync(distRoot)) {
    console.error(`check-tree-shaking: dist/ not found. Run \`pnpm build\` first.`);
    process.exit(1);
}

// Only component subpaths are expected to stay clear of the barrel.
walk(resolve(distRoot, "components"));

if (violations.length > 0) {
    console.error(
        "check-tree-shaking: the following files import the root barrel " +
            "(`dist/index.js`), which defeats tree-shaking for subpath imports:",
    );
    for (const v of violations) {
        console.error("  - " + v.replace(packageRoot + "/", ""));
    }
    process.exit(1);
}

console.log("check-tree-shaking: OK (no subpath entry imports the root barrel)");
