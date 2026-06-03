# NeoBr-UI Improvement TODO

Fresh audit date: 2026-06-03

This is a new audit after the previous TODO was completed and committed. It focuses on deeper type-safety, remaining context consistency, test coverage gaps, and maintenance polish.

## Current Baseline

- `vp run --filter @neobr/svelte test`: passes, 44 test files / 288 tests.
- `vp run --filter @neobr/svelte check`: passes with 0 warnings.
- `vp run --filter @neobr/svelte build`: passes.
- `vp run --filter @neobr/svelte pack:check`: passes, package file list clean.
- `vp run --filter docs check`: passes with 0 warnings.
- `vp run --filter docs build`: passes.
- `vp check packages/svelte`: passes.

## Context Map

| Area                           | Files                                                                                                  | Risk                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Remaining ad hoc context       | `tabs/*`, `radio-group/*`                                                                              | ✅ Done: Tabs and RadioGroup now use typed `createContext` modules with misuse tests.                      |
| Public API typing              | `button.svelte`, `icon.svelte`, `input.svelte`, `accordion.svelte`, `calendar.svelte`, `select.svelte` | ✅ Done: public component sources no longer use broad `any`; Bits UI wrappers use constrained casts.       |
| Bits UI wrappers               | `accordion.svelte`, `calendar.svelte`, `select.svelte`, `types/bits-ui-compat.ts`                      | ✅ Done: wrappers keep union-mode API while avoiding broad `any`; deeper overload design remains optional. |
| Select test coverage           | `select.test.ts`, `select-test-wrapper.svelte`                                                         | ✅ Done: restored JSDOM-supported open/select/Escape/keyboard interaction coverage.                        |
| Overlay internals              | `utils/overlay.svelte.ts`, `modal.svelte`, `sheet.svelte`, `dropdown-menu.svelte`                      | ✅ Done: overlay controllers now expose typed Svelte attachments; consumers no longer use `bind:this`.     |
| SvelteKit package warning      | `packages/svelte/tsconfig.json`, `svelte.config.js`                                                    | ✅ Done: check/build scripts run `svelte-kit sync`, tsconfig extends generated config, warning removed.    |
| Calendar rendering duplication | `calendar.svelte`, `date-picker.svelte`, `calendar-grid.svelte`                                        | ✅ Done: shared calendar grid renderer covers Calendar and DatePicker day layout/classes.                  |
| Docs/demo polish               | `apps/docs/src/routes/components/form/+page.svelte`, docs decorative z-index usage                     | ✅ Done: form demo no longer logs/alerts; reusable docs chrome avoids decorative `z-10` where practical.   |

## P0 - No New Confirmed Behavior Bugs

No newly confirmed P0 behavior bug was found in this pass. The next work is mostly type-safety, test coverage, and maintenance hardening.

## P1 - Type Safety And Context Consistency

### 1. Move Tabs and RadioGroup to typed context modules ✅ Done

Evidence:

- `tabs/tabs.svelte` still imports `setContext` directly and uses `Symbol.for("tabs")`.
- `tabs/tabs-trigger.svelte` and `tabs/tabs-content.svelte` still call `getContext<{ ... }>()` inline.
- `radio-group/radio-group.svelte` still imports `setContext` directly and uses `Symbol.for("radio-group")`.
- `radio-group/radio-group-item.svelte` still calls `getContext<{ ... }>()` inline.

Plan:

- Add `tabs-context.ts` and `radio-group-context.ts` using Svelte `createContext`.
- Keep deliberate missing-provider behavior for required compound children, or provide explicit `requireTabsState` / `requireRadioGroupState` helpers with clear errors.
- Add misuse tests for `TabsTrigger`, `TabsContent`, and `RadioGroupItem` outside their roots.
- Preserve existing unique ID behavior in Tabs.

Verification:

- `vp run --filter @neobr/svelte test -- tabs radio-group` ✅ 44 files / 278 tests
- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings

### 2. Remove public `any` leaks and unsafe casts where practical ✅ Done

Evidence:

- ✅ Done: `button/button.svelte` now uses a targeted `HTMLAnchorAttributes` cast instead of `{...rest as any}`.
- ✅ Done: `input/input.svelte` now narrows `value` to `string | number | undefined`.
- ✅ Done: `icon/icon.svelte` now uses Hugeicons `IconSvgElement` / component prop types instead of broad `any`.
- ✅ Done: `error-boundary/error-boundary.svelte` now treats fallback errors as `unknown` and formats messages through a type guard.
- ✅ Done: `accordion/accordion.svelte`, `calendar/calendar.svelte`, and `select/select.svelte` no longer use `value as any` or `rest as any`; union-mode bindings use constrained casts and rest spreads use `Record<string, unknown>`.
- ✅ Done: colocated test wrappers no longer use broad `any`.

Plan:

- Replace broad `any` with `unknown`, HTML element attribute types, or targeted library types. ✅ Done.
- Split overloaded component props where necessary (e.g. Button anchor vs button props). ✅ Done without introducing a TS union too complex for Svelte.
- Improve `Icon` prop typing from Hugeicons package exports if available; otherwise define a narrow accepted icon shape. ✅ Done with `IconSvgElement`.
- For Bits UI wrappers, avoid broad `any` while preserving the existing union-mode public API. ✅ Done.

Verification:

- `rg -n "\\bany\\b|as any" packages/svelte/src/lib/components/ui packages/svelte/src/lib/types` ✅ no matches
- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings
- `vp run --filter @neobr/svelte build` ✅

### 3. Revisit Bits UI compatibility wrappers ✅ Done

Evidence:

- `types/bits-ui-compat.ts` documents the supported single/multiple value relationship.
- Wrapper components bind values with union modes (`single`/`multiple`) that TypeScript cannot currently narrow at the call site; broad `any` casts were replaced with constrained casts.

Plan:

- Kept the existing single/multiple union-mode public API to avoid breaking consumers.
- Replaced `as any` with constrained casts in the wrapper layer.
- Deferred deeper overload/type-fixture work until there is a concrete consumer need.

Verification:

- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings
- `vp run --filter @neobr/svelte build` ✅

## P2 - Test Coverage And Tooling Hygiene

### 4. Restore Select interaction tests ✅ Done

Evidence:

- `select/select.test.ts` had a large commented-out block with `TODO: Interaction tests fail in JSDOM with bits-ui currently`.
- Current Select tests only covered closed/default/disabled/placeholder/class behavior.

Plan:

- Added a pointer-capture polyfill for Bits UI pointer interactions in JSDOM.
- Restored JSDOM-supported interaction tests for pointer open, pointer select, single mode open, Escape close, and keyboard open.
- Fixed selected-label rendering by using `Select.Value`, passing item labels, and forwarding `items` into the root wrapper. Outside-click dismissal still needs browser/e2e coverage because Bits UI's dismissible-layer outside interaction does not close reliably under this JSDOM setup.

Verification:

- `vp run --filter @neobr/svelte test -- select` ✅ 44 files / 283 tests
- Browser/e2e outside-click coverage remains optional future work.

### 5. Reduce recurring SvelteKit tsconfig warning noise ✅ Done

Evidence:

- `vp run --filter @neobr/svelte check` and `build` previously printed:
  `Your tsconfig.json should extend the configuration generated by SvelteKit: { "extends": "./.svelte-kit/tsconfig.json" }`.
- The package previously extended `../../tsconfig.json` and included local `$lib` paths that duplicated generated SvelteKit config.

Plan:

- Updated package `check`, `check:watch`, and `build` scripts to run `svelte-kit sync` before Svelte tooling.
- Updated `packages/svelte/tsconfig.json` to extend `./.svelte-kit/tsconfig.json`, keep strict compiler options locally, and remove duplicate path aliases.
- Kept generated `.svelte-kit` untracked and excluded by existing package guards.

Verification:

- `vp run --filter @neobr/svelte check` ✅ no warning banner, 0 errors / 0 warnings
- `vp run --filter @neobr/svelte build` ✅ no warning banner

### 6. Add a focused smoke test for package exports ✅ Done

Evidence:

- `pack:check` verifies file contents but does not import the packed/compiled exports.
- The library has many subpath exports in `package.json` that can drift from generated `dist` files.
- ✅ Found and fixed stale `module: dist/index.mjs`; package output currently emits `dist/index.js`.

Plan:

- Add a script that runs after `svelte-package` and checks every package export path resolves to existing JS and `.d.ts` files. ✅ Done in `scripts/check-package-exports.mjs`.
- Optionally import selected JS exports in Node for non-component utilities (`utils`, `form`, `toast`). Deferred; existence checks cover current drift risk without executing browser-oriented component modules in Node.

Verification:

- `vp run --filter @neobr/svelte exports:check` ✅ 141 paths
- `vp run --filter @neobr/svelte build && vp run --filter @neobr/svelte exports:check` ✅

## P3 - Internal Architecture Cleanup

### 7. Refactor overlay element capture away from `bind:this` where useful ✅ Done

Evidence:

- ✅ Done: `modal.svelte`, `sheet.svelte`, and `dropdown-menu.svelte` no longer use `bind:this`.
- ✅ Done: `utils/overlay.svelte.ts` exposes typed Svelte attachments for content registration.
- ✅ Done: Dropdown keyboard navigation reads the registered content element from the dismissable overlay controller.

Plan:

- Added a `content` attachment to `useOverlayController` and `useDismissableOverlay`.
- Kept focus trap, focus restoration, stack ordering, scroll locking, and Escape handling behavior unchanged.
- Removed content getter closures from modal/sheet and direct element state from dropdown.

Verification:

- `vp run --filter @neobr/svelte test -- modal sheet dropdown-menu popover` ✅ 44 files / 286 tests
- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings

### 8. Deduplicate Calendar and DatePicker grid rendering ✅ Done

Evidence:

- ✅ Done: the duplicated inline grid markup and duplication notes were removed from `calendar.svelte` and `date-picker.svelte`.
- ✅ Done: `calendar/calendar-grid.svelte` now owns month/week/day rendering and the shared day state class strings.

Plan:

- Extracted a shared renderer using Bits UI Calendar primitives, which DatePicker re-exports for its calendar popover.
- Kept Calendar and DatePicker public APIs unchanged.
- Added regression assertions for selected, today, and outside-month state/class wiring in both components.

Verification:

- `vp run --filter @neobr/svelte test -- calendar date-picker` ✅ 44 files / 288 tests
- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings

### 9. Improve Toast state determinism and testability ✅ Done

Evidence:

- ✅ Done: `toast/toast-state.svelte.ts` now supports internal ID/timer dependency injection.
- ✅ Done: tests instantiate a fresh `ToastManager` per case with deterministic IDs and fake timers.

Plan:

- Exported `ToastManager` while keeping the existing singleton `toast` export unchanged.
- Added timer tracking, `clear()`, and manual-dismiss timer cleanup.
- Added fake-timer tests for auto-dismiss, persistent toasts, and manual cleanup.

Verification:

- `vp run --filter @neobr/svelte test -- toast` ✅ 44 files / 286 tests
- `vp run --filter @neobr/svelte check` ✅ 0 errors / 0 warnings

## P4 - Docs And Demo Polish

### 10. Remove demo `console.log` and tighten docs examples ✅ Done

Evidence:

- ✅ Done: `apps/docs/src/routes/components/form/+page.svelte` no longer logs submitted values or uses `alert`.
- ✅ Done: reusable docs chrome no longer uses hard-coded `z-10` for local copy/preview stacking.
- Remaining `z-10` examples are local composition/hit-area layering (`Sticker`, `Checkbox`, `RadioGroup`) and are intentionally not global overlay layers.

Plan:

- Replaced the form demo submit side effect with local submitted-email state output.
- Removed console logging from the dropdown menu test wrapper.
- Kept local `z-10` only where it is clearly component-local stacking, not global layering.
- Updated docs check/build scripts to run `svelte-kit sync` and made docs tsconfig extend generated SvelteKit config without warning noise.

Verification:

- `vp run --filter docs check` ✅ 0 errors / 0 warnings
- `vp run --filter docs build` ✅ passes

### 11. Move or rename colocated test wrappers if they keep creating packaging complexity ✅ No Change Needed

Evidence:

- Many `*-test-wrapper.svelte` files live beside public components under `src/lib/components/ui`.
- `pack:check` now prevents shipping them, but colocated wrappers increase package exclude complexity.
- ✅ Current package guards exclude colocated wrappers cleanly; no new packaging complexity was found.

Plan:

- Deferred wrapper relocation because it would churn many tests without improving current package output.
- Keep the existing colocated test-wrapper pattern while `pack:check` and `exports:check` protect published artifacts.

Verification:

- `vp run --filter @neobr/svelte test` ✅ 44 files / 288 tests
- `vp run --filter @neobr/svelte build` ✅
- `vp run --filter @neobr/svelte pack:check` ✅ package file list clean

## Recommended Execution Order

1. Convert Tabs and RadioGroup to typed context modules.
2. Restore Select interaction coverage or document a browser-test path.
3. Reduce public `any`/casts in Button, Input, Icon, and Bits UI wrappers.
4. Add compiled export smoke checks.
5. Investigate the recurring SvelteKit tsconfig warning.
6. Evaluate overlay attachment refactor. ✅ Done
7. Deduplicate Calendar/DatePicker rendering. ✅ Done
8. Polish docs demos and revisit colocated test wrappers. ✅ Done / no relocation needed

## Done Criteria

- `vp run --filter @neobr/svelte test` passes.
- `vp run --filter @neobr/svelte check` has 0 warnings.
- `vp run --filter @neobr/svelte build` passes.
- `vp run --filter @neobr/svelte pack:check` passes.
- `vp run --filter docs check` has 0 warnings.
- `vp run --filter docs build` passes.
- Any new package/export guard passes in CI-equivalent commands.
- New tests cover Select interactions or explicitly document why they require browser/e2e coverage.
