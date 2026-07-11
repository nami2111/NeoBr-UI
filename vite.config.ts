import { defineConfig } from "vite-plus";

export default defineConfig({
    staged: {
        // `vp check`'s lint step auto-discovers each workspace package's
        // SvelteKit vite.config from the repo root and runs `svelte-kit sync`
        // against the root cwd (looks for `src/app.html` here, not in the
        // package), which fails. Format works from root; lint must run
        // per-package (`vp check` inside the package dir). CI enforces format
        // via `vp fmt --check` per-package, so we keep format-on-commit only.
        "*.{js,ts,svelte}": "vp check --no-lint --fix",
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
