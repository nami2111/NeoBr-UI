import { defineConfig } from "vite-plus";

export default defineConfig({
    staged: {
        "*.{js,ts,svelte}": "vp check --fix",
    },
    fmt: {
        useTabs: false,
        singleQuote: false,
        trailingComma: "all",
        printWidth: 100,
        tabWidth: 4,
        sortTailwindcss: {},
        sortPackageJson: false,
        ignorePatterns: ["**/dist/**", "**/.svelte-kit/**", "**/build/**"],
    },
});
