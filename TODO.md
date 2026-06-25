# Library Improvement Plan

Goal: improve the component library's design quality, accessibility, package ergonomics, and public API without reopening the architecture or adding speculative abstractions.

## 1. Fix overlay accessibility and mobile layout

- [x] Remove fixed modal `min-w-*` sizes in `packages/svelte/src/lib/components/ui/modal/modal.svelte`.
- [x] Use `w-full` plus `max-w-*` so `md`, `lg`, and `xl` modals cannot overflow narrow mobile screens.
- [x] Replace or simplify backdrop semantics in `modal.svelte`; avoid `div role="button"` with `tabindex="-1"`.
- [x] Replace or simplify backdrop semantics in `packages/svelte/src/lib/components/ui/sheet/sheet.svelte`.
- [x] Add `aria-labelledby` support to `sheet.svelte` when a sheet title exists.
- [x] Keep Escape and close-button behavior unchanged.
- [x] Verify with the existing modal and sheet tests.

## 2. Make library CSS less invasive

- [x] Review `packages/svelte/src/lib/styles/design-system.css` for rules that affect the whole consuming app.
- [x] Stop forcing JetBrains Mono as both the default sans and mono font for every consumer.
- [x] Keep font tokens available, but let the consuming app own its actual body font.
- [x] Scope or remove the global reduced-motion override that targets `*`, `*::before`, and `*::after`.
- [x] Keep component-level motion respectful of `prefers-reduced-motion`.
- [x] Avoid adding theme configuration machinery unless a real consumer need appears.
- [x] Verify docs and package build after the CSS change.

## 3. Standardize icon behavior

- [x] Decide the smallest consistent icon rule for components: use the existing `Icon` wrapper for HugeIcons-based internal icons.
- [x] Remove the mismatch where modal uses HugeIcons through `Icon` but sheet uses inline SVG.
- [x] Prefer caller override points for component icons where users are likely to care; no close-icon override yet because there is no consumer need.
- [x] Keep HugeIcons if it remains useful internally; do not add another icon dependency.
- [x] Avoid a new icon abstraction unless it removes existing inconsistency.
- [x] Verify affected component tests and examples.

## 4. Tighten form helper expectations

- [x] Decide whether `createFormState` is intentionally a flat text-form helper.
- [x] If yes, document that nested paths and non-string defaults are out of scope.
- [x] Skip full Zod issue paths; errors remain keyed by top-level field.
- [x] Stop silently defaulting every missing field value to `""` when the schema may expect numbers, booleans, arrays, dates, or objects.
- [x] Prefer requiring explicit `initialValues` for non-string fields over guessing defaults.
- [x] Keep the API small; do not build a full form library inside the component package.
- [x] Verify form tests and add one small regression test for the chosen behavior.

## 5. Recheck package contents

- [ ] Confirm whether published packages still need to include `src/lib`.
- [ ] If not needed, remove `src/lib` from the `files` list in `packages/svelte/package.json`.
- [ ] Keep only `dist`, package metadata, README, and license in the published package.
- [ ] Remove fixture/test exclusions that become unnecessary after source is no longer shipped.
- [ ] Verify with `vp run --filter @neobr/svelte pack:check`.

## 6. Improve TypeScript surfaces only where users feel pain

- [ ] Review Bits UI compatibility casts in select, accordion, calendar, date-picker, and related wrappers.
- [ ] Fix public prop types where casts leak into consumer ergonomics.
- [ ] Avoid splitting components into extra variants unless the current API creates real TypeScript friction.
- [ ] Keep internal casts if they are only local glue and tests prove runtime behavior.
- [ ] Verify with `vp run --filter @neobr/svelte check`.

## 7. Polish design-system utilities

- [ ] Review duplicated brutalist button utility classes in `design-system.css`.
- [ ] Collapse exact duplicates only if the resulting CSS stays clearer than the duplication.
- [ ] Keep existing visual output stable unless a style change is intentional.
- [ ] Add docs examples for theme overrides only after the CSS API settles.

## 8. Docs and examples pass

- [ ] Add or update examples that show responsive modal/sheet behavior.
- [ ] Add or update examples that show overriding component icons if icon override points are added.
- [ ] Add a minimal theme override example for fonts and motion after CSS scoping is done.
- [ ] Skip a large design playground for now; add one only if users need to compare themes interactively.

## Done Criteria

- [x] `vp run -r check` passes.
- [x] `vp run build` passes.
- [x] `vp run test` passes.
- [ ] `vp run --filter @neobr/svelte pack:check` passes if package contents changed.
- [x] Modal and sheet work on narrow mobile widths without horizontal overflow.
- [x] Sheet and modal dialogs have sane accessible names.
- [x] Importing `@neobr/svelte/style` no longer takes over unrelated app-wide fonts or motion.
