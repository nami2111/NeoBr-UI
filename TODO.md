# NeoBr-UI Improvement TODO

Fresh audit date: 2026-06-02

This plan replaces the previous deleted TODO with current findings from source review, Svelte docs, Svelte MCP autofixer, package checks, tests, docs build, and `npm pack --dry-run`.

## Current Baseline

- `vp run --filter @neobr/svelte test`: passes, 44 test files / 261 tests.
- `vp run --filter @neobr/svelte check`: passes with 0 warnings.
- `vp run --filter docs check`: passes with 0 warnings.
- `vp run --filter docs build`: passes.
- `vp run --filter @neobr/svelte build`: passes.
- `vp check packages/svelte`: passes.
- `vp check packages/svelte/src/lib`: passes with 0 warnings.
- `npm pack --dry-run --json --cache /tmp/neobr-npm-cache`: package file list contains no tests, test wrappers, `.svelte-kit`, or generated test internals.

## Context Map

| Area | Files | Risk |
| --- | --- | --- |
| Command behavior | `packages/svelte/src/lib/components/ui/command/*`, `apps/docs/src/routes/components/command/+page.svelte` | `CommandEmpty` is visible while results exist. |
| SSR determinism | `tooltip.svelte`, `sticker.svelte`, `modal.svelte`, `tabs-*` | Hydration mismatches and duplicate DOM IDs. |
| Package hygiene | `packages/svelte/package.json`, `packages/svelte/svelte.config.js`, generated `dist` | npm package includes test-only code and generated files break checks. |
| Typed compound state | `command.svelte`, `collapsible.svelte`, `form-item.svelte`, `toggle-group-*` | Shallow context modules, `any`, and ad hoc context keys. |
| Form validation | `utils/form-validation.svelte.ts`, `components/ui/form/*` | Public utility relies on `any`, Zod object internals, and limited tests. |
| Docs a11y/tooling | `apps/docs/src/routes/+layout.svelte`, docs component pages | Demo app carries a11y suppressions and hard-coded layer classes. |

## P0 - Fix Confirmed Behavior Bugs

### 1. Command empty state is always rendered ✅ Done

Evidence:
- `packages/svelte/src/lib/components/ui/command/command-empty.svelte:10` renders a visible div unconditionally.
- `packages/svelte/src/lib/components/ui/command/command.test.ts:60` asserts "No results found." exists in the default populated state, so the test blesses the bug.
- `apps/docs/src/routes/components/command/+page.svelte` uses `CommandEmpty` before populated groups, so docs demonstrate the wrong behavior.

Plan:
- Move result registration/search matching into the command module interface.
- Let `CommandItem` register whether it is currently visible, or let `CommandList` derive visible count from registered item values.
- Render `CommandEmpty` only when search is non-empty and no items match.
- Update tests to assert the empty state is absent initially, absent for partial matches, and present only for no-match queries.

Verification:
- `vp run --filter @neobr/svelte test -- command`
- `vp run --filter docs build`

### 2. Tooltip and sticker can hydrate with different markup/styles ✅ Code fixed / ⚠️ SSR hydration tests still optional

Evidence:
- `tooltip.svelte:17` uses `crypto.randomUUID()` during component setup for an ARIA ID.
- `sticker.svelte:21` uses `Math.random()` during component setup for default rotation.
- Svelte 5 provides `$props.id()` specifically for SSR-stable component IDs.

Plan:
- Replace tooltip ID generation with `$props.id()` and derive `tooltip-${uid}`.
- Make `Sticker` deterministic by default. Prefer `rotation={0}` or derive a stable pseudo-random rotation from `$props.id()` only if the visual jitter is worth preserving.
- Add SSR/hydration tests for Tooltip and Sticker, not just JSDOM interaction tests.

Verification:
- Add a server-render + hydrate test that fails on ID/style mismatch.
- `vp run --filter @neobr/svelte test -- tooltip sticker`

### 3. Modal title ID is duplicated across simultaneous modals ✅ Done

Evidence:
- `modal.svelte:160` references `"modal-title"`.
- `modal.svelte:188` renders `id="modal-title"`.

Plan:
- Generate an instance-stable ID with `$props.id()`.
- Use the derived ID for `aria-labelledby` and the heading.
- Apply the same audit to tabs IDs (`trigger-${value}` / `tabpanel-${value}`), because values may collide across multiple tab groups.

Verification:
- Add tests rendering two modals/two tab groups on the same page.
- Run `vp run --filter @neobr/svelte test -- modal tabs`.

## P1 - Fix Package And Tooling Hygiene

### 4. npm package ships tests and test wrappers ✅ Package fixed / ⚠️ CI guard still optional

Evidence:
- `packages/svelte/package.json:268` includes both `dist` and `src`.
- It excludes only `!dist/**/*.test.*` and `!dist/**/*.spec.*`.
- `npm pack --dry-run` reports 578 package entries and includes paths like `src/lib/components/ui/command/command.test.ts`, `src/tests/setup.ts`, and `dist/components/ui/command/command-test-wrapper.svelte`.

Plan:
- Decide whether source publishing is required for declaration maps. If yes, include only `src/lib` and exclude all tests/wrappers:
  - `!src/**/*.test.*`
  - `!src/**/*.spec.*`
  - `!src/tests/**`
  - `!src/**/*test-wrapper.svelte`
  - `!src/**/*-test.svelte`
  - matching `dist` exclusions for wrappers and generated test Svelte files.
- Prefer moving test wrappers to a package-private `src/tests/components` tree or inlining small wrappers in tests so `svelte-package` does not copy them into `dist`.
- Add a CI check that runs `npm pack --dry-run --json` and fails if `*.test.*`, `*test-wrapper*`, `src/tests/*`, or `.svelte-kit/*` appear in the file list.

Verification:
- `vp run --filter @neobr/svelte build`
- `npm pack --dry-run --json --cache /tmp/neobr-npm-cache`

### 5. Full package check scans generated artifacts and fails ✅ Done

Evidence:
- `vp check packages/svelte` fails on `.svelte-kit/__package__` and `dist` formatting issues after build.
- `vp check packages/svelte/src/lib` passes source formatting, so the failure is target/ignore hygiene.

Plan:
- Add generated-output ignore patterns to `vite.config.ts` formatting/lint config if Vite+ supports it, or document/use path-targeted checks in scripts.
- Consider changing package `lint` from `vp fmt --check .` to a source-only target.
- Remove generated `dist` from any human-editable check path in CI.

Verification:
- `vp check packages/svelte`
- `vp check packages/svelte/src/lib`

### 6. Svelte-check warnings point at generated name collisions ✅ Done

Evidence:
- Library check warns that `toast.svelte.ts` would generate `toast.svelte.js` and collide with another input.
- Docs check warns about `svelte.config.js` overwrite.

Plan:
- Rename `packages/svelte/src/lib/components/ui/toast/toast.svelte.ts` to a non-component-looking rune module, e.g. `toast-state.svelte.ts`, then update exports/imports.
- Review tsconfig includes so package checks do not include generated files as inputs.

Verification:
- `vp run --filter @neobr/svelte check`
- `vp run --filter docs check`

## P2 - Deepen Compound Component Modules

### 7. Replace ad hoc context seams with typed Svelte 5 context modules

Evidence:
- `command.svelte:1`, `collapsible.svelte:1`, and `form-item.svelte:1` define context keys inside component module scripts.
- `toggle-group-item.svelte:16` uses `getContext<any>`.
- Svelte 5.40+ provides `createContext`, and this repo uses Svelte 5.53.12.

Plan:
- Create small typed context modules per compound module, e.g. `command-context.ts`, `collapsible-context.ts`, `form-context.ts`, `toggle-group-context.ts`.
- Use `createContext<T>()` for type-safe get/set pairs.
- Encode missing-provider behavior deliberately. Either throw clear errors when subcomponents are used outside a root, or support standalone fallback behavior.
- Test misuse cases for every compound module.

Benefits:
- Better locality: state contracts live in one typed module.
- Better leverage: child components no longer duplicate context shapes or use `any`.
- Safer API evolution for command/search, form error state, and toggle-group modes.

### 8. Refactor focus trap and scroll-lock into a reusable overlay module

Evidence:
- `modal.svelte` and `sheet.svelte` duplicate focus trapping, previous-focus restoration, Escape handling, and scroll locking.
- Svelte autofixer flagged the overlay `$effect` as complex and worth review.

Plan:
- Create one overlay behavior module that handles:
  - lock/unlock with reference counting,
  - focus capture/restoration,
  - Tab loop,
  - Escape close,
  - cleanup on unmount.
- Use it from Modal and Sheet first, then evaluate Popover/Dropdown.
- Add tests for nested overlays, close ordering, focus restoration, and scroll-lock count.

Verification:
- `vp run --filter @neobr/svelte test -- modal sheet popover dropdown`

## P3 - Tighten Public Utility Interfaces

### 9. Harden `createFormState`

Evidence:
- `form-validation.svelte.ts:69`, `:70`, and `:92` use `any` and rely on Zod object internals.
- `reset()` reuses `initialData` by reference at `:186`.
- Tests exercise visual Form components but not the validation utility interface deeply.

Plan:
- Constrain the utility to `z.ZodObject<z.ZodRawShape>` explicitly or design an adapter interface for supported schemas.
- Avoid shared object references on reset; clone from an immutable initial snapshot.
- Add unit tests for validation timing, reset isolation, async submit failure, nested errors, default values, and `validateOnChange`/`validateOnBlur`.
- Decide whether empty-string defaults are always correct, especially for number/boolean/date fields.

Verification:
- `vp run --filter @neobr/svelte test -- form`

### 10. Normalize motion tokens in component transitions

Evidence:
- `TRANSITION_BRUTALIST` and `TRANSITION_BRUTALIST_SLOW` exist, but some components still inline transition durations.

Plan:
- Replace inline transition configs in Checkbox, RadioGroupItem, Tooltip, DropdownMenu, Popover, Modal backdrop, Sheet backdrop, and Collapsible with motion utilities where behavior should be consistent.
- Keep exceptions documented when a component needs a distinct duration.

Verification:
- `rg -n "transition:.*duration|duration: [0-9]+" packages/svelte/src/lib/components/ui`

## P4 - Docs And Maintenance Cleanup

### 11. Remove docs a11y suppressions and hard-coded layering where practical

Evidence:
- `apps/docs/src/routes/+layout.svelte:87` suppresses click/key a11y warnings for the mobile overlay.
- The docs layout uses hard-coded `z-[60]`, `z-50`, and `z-40`.

Plan:
- Use a semantic button or add keyboard handling/ARIA to the mobile overlay.
- Prefer design-system z-index tokens in docs app where they represent global layers.
- Add a smoke test or axe pass for docs layout/mobile menu.

### 12. Clean unused imports in tests ✅ Done

Evidence:
- `vp check packages/svelte/src/lib` reports unused imports in several tests (`vi`, `screen`).

Plan:
- Remove unused imports from Checkbox, Command, Calendar, AspectRatio, and Marquee tests.
- Keep this as opportunistic cleanup after P0/P1.

Verification:
- `vp check packages/svelte/src/lib`

## Recommended Execution Order

1. Fix Command empty-state behavior and tests.
2. Fix SSR-stable IDs/random setup in Tooltip, Sticker, Modal, and Tabs.
3. Fix package `files`/test-wrapper leakage and add pack dry-run guard.
4. Fix generated-output check targets and `toast.svelte.ts` naming warning.
5. Deepen typed context modules for Command, ToggleGroup, Collapsible, and Form.
6. Extract reusable overlay/focus/scroll behavior.
7. Harden `createFormState` with focused tests.
8. Clean docs a11y suppressions and small lint warnings.

## Done Criteria

- `vp run --filter @neobr/svelte test` passes.
- `vp run --filter @neobr/svelte check` has 0 warnings.
- `vp run --filter docs check` has 0 warnings.
- `vp run --filter docs build` passes.
- `vp check packages/svelte` no longer scans generated output or passes cleanly.
- `npm pack --dry-run --json --cache /tmp/neobr-npm-cache` contains no tests, test wrappers, `.svelte-kit`, or generated package internals.
- Added tests fail before and pass after fixes for Command empty state, SSR-stable IDs, duplicate modal/tab IDs, package file leakage, and overlay focus/scroll behavior.
