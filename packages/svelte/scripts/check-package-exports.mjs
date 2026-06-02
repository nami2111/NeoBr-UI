import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = resolve(packageRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

const checkedPaths = new Set();
const missingPaths = [];

function checkPackagePath(label, packagePath) {
    if (typeof packagePath !== "string" || !packagePath) return;

    const normalizedPath = packagePath.startsWith("./") ? packagePath.slice(2) : packagePath;
    const fullPath = resolve(packageRoot, normalizedPath);

    checkedPaths.add(`${label}: ${packagePath}`);

    if (!existsSync(fullPath)) {
        missingPaths.push(`${label}: ${packagePath}`);
    }
}

checkPackagePath("main", packageJson.main);
checkPackagePath("module", packageJson.module);
checkPackagePath("types", packageJson.types);

for (const [exportName, exportTarget] of Object.entries(packageJson.exports ?? {})) {
    if (typeof exportTarget === "string") {
        checkPackagePath(`exports[${exportName}]`, exportTarget);
        continue;
    }

    if (!exportTarget || typeof exportTarget !== "object") continue;

    for (const [condition, conditionTarget] of Object.entries(exportTarget)) {
        if (typeof conditionTarget === "string") {
            checkPackagePath(`exports[${exportName}].${condition}`, conditionTarget);
        }
    }
}

if (missingPaths.length > 0) {
    console.error("Package export targets are missing generated files:");
    for (const missingPath of missingPaths) console.error(`- ${missingPath}`);
    process.exit(1);
}

console.log(`Package export targets exist (${checkedPaths.size} paths).`);
