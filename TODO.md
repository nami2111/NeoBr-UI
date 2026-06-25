# Ponytail Cleanup Plan

Repo-wide goal: remove duplicated package surface, unused dependencies, and test-only wrapper files without changing component behavior.

## 1. Collapse the Tailwind preset package

- [x] Export the design-system CSS from `@neobr/svelte` as `./style`.
- [x] Move public install/docs examples from `@neobr/tailwind-preset/style` to `@neobr/svelte/style`.
- [x] Update the docs app CSS import in `apps/docs/src/app.css`.
- [x] Remove `packages/tailwind-preset` from the workspace once imports are migrated.
- [x] Delete root `sync:css` and `prebuild` copy step.
- [x] Remove `@neobr/tailwind-preset` from `packages/svelte/package.json` and `apps/docs/package.json`.
- [x] Run `vp install --lockfile-only` to prune the lockfile.
- [x] Verify with `vp run -r check` and `vp run build`.

## 2. Shrink package exports

- [x] Replace the hand-maintained component subpath export map in `packages/svelte/package.json` with wildcard exports for `./*`.
- [x] Keep explicit exports only for special paths: `.`, `./style`, and `./utils` if needed.
- [x] Confirm `@neobr/svelte/button`, `@neobr/svelte/form`, and root imports still resolve after build.
- [x] Update `packages/svelte/scripts/check-package-exports.mjs` only if wildcard exports need different validation.
- [x] Verify with `vp run --filter @neobr/svelte build` and `vp run --filter @neobr/svelte exports:check`.

## 3. Remove unused dependencies

- [x] Delete unused library dev deps from `packages/svelte/package.json`: `@sveltejs/adapter-auto`, `@testing-library/dom`, `vitest-dom`.
- [x] Delete unused docs dev deps from `apps/docs/package.json`: `@sveltejs/package`, `@tailwindcss/postcss`, `autoprefixer`, `postcss`.
- [x] Keep `@tailwindcss/vite`; `apps/docs/vite.config.ts` uses it.
- [x] Keep `vitest-axe` and `@testing-library/jest-dom`; tests import them.
- [x] Run `vp install --lockfile-only`.
- [x] Verify with `vp run -r check` and `vp run test`.

## 4. Delete test-only wrapper components

- [x] Replace `*-test-wrapper.svelte`, `*-test.svelte`, and `*-test-helper.svelte` files that only pass props/slot text with inline test components or direct renders.
- [x] Remove pure pass-through wrappers for `badge`, `button`, `label`, `link`, `marquee`, `scroll-area`, `sticker`, `toggle`, and `window`.
- [x] Review composed fixtures separately: `card`, `table`, `alert`, `bento-grid`, overlays, forms, grouped controls, and error-boundary helpers.
- [x] Keep wrappers only where they model real multi-component usage or error-boundary behavior.
- [x] Keep matching package file exclusions because composed fixture files remain.
- [x] Verify this batch with `vp run --filter @neobr/svelte test`.

## 5. Reduce duplicated export lists

- [x] Decide whether root `src/lib/index.ts` should stay as the curated barrel.
- [x] If subpath wildcard exports work, avoid generating another component list unless consumers need root imports.
- [x] If root imports stay, keep `src/lib/index.ts` as the single human-maintained component list.
- [x] Do not add a generator unless export drift keeps recurring.

## Done Criteria

- [x] Package count reduced by one.
- [x] Lockfile has fewer dependencies.
- [x] `vp run -r check` passes.
- [x] `vp run build` passes.
- [x] `vp run test` passes.
- [x] Public README and docs install snippets match the new CSS import path.
