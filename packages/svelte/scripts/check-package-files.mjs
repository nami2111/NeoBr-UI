import { execFileSync } from "node:child_process";

const output = execFileSync(
    "npm",
    ["pack", "--dry-run", "--json", "--cache", "/tmp/neobr-npm-cache"],
    { encoding: "utf8" },
);

const [pack] = JSON.parse(output);
const files = pack.files.map((file) => file.path);

const blockedPatterns = [
    /(^|\/)\.svelte-kit(\/|$)/,
    /(^|\/)src\/tests(\/|$)/,
    /(^|\/)tests(\/|$)/,
    /\.test\./,
    /\.spec\./,
    /test-wrapper/,
    /test-helper/,
    /-test\.svelte/,
];

const blockedFiles = files.filter((file) => blockedPatterns.some((pattern) => pattern.test(file)));

if (blockedFiles.length > 0) {
    console.error("Package file list contains test/generated internals:");
    for (const file of blockedFiles) console.error(`- ${file}`);
    process.exit(1);
}

console.log(`Package file list clean (${files.length} files).`);
