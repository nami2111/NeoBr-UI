# NeoBr-UI Improvement TODO

Fresh audit date: 2026-06-03

This is a new audit after the previous TODO was completed and committed. It focuses on deeper type-safety, remaining context consistency, test coverage gaps, and maintenance polish.

## Current Baseline

- `vp run --filter @neobr/svelte test`: passes, 44 test files / 278 tests.
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
| Public API typing              | `button.svelte`, `icon.svelte`, `input.svelte`, `accordion.svelte`, `calendar.svelte`, `select.svelte` | Public components still expose or rely on `any` casts, weakening declaration quality.                      |
| Bits UI wrappers               | `accordion.svelte`, `calendar.svelte`, `select.svelte`, `types/bits-ui-compat.ts`                      | Current compatibility layer forces casts and may hide upstream type/API drift.                             |
| Select test coverage           | `select.test.ts`, `select-test-wrapper.svelte`                                                         | Interaction tests are commented out, leaving open/select/keyboard behavior under-tested.                   |
| Overlay internals              | `utils/overlay.svelte.ts`, `modal.svelte`, `sheet.svelte`, `dropdown-menu.svelte`                      | Autofixer repeatedly flags `bind:this` and complex `$effect` cleanup patterns.                             |
| SvelteKit package warning      | `packages/svelte/tsconfig.json`, `svelte.config.js`                                                    | Checks/builds pass but print recurring `tsconfig.json should extend ./.svelte-kit/tsconfig.json` warnings. |
| Calendar rendering duplication | `calendar.svelte`, `date-picker.svelte`                                                                | Calendar grid rendering is duplicated and already documented inline.                                       |
| Docs/demo polish               | `apps/docs/src/routes/components/form/+page.svelte`, docs decorative z-index usage                     | Demos include `console.log`; decorative hard-coded `z-10` remains in examples.                             |

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

### 2. Remove public `any` leaks and unsafe casts where practical

Evidence:

- ✅ Done: `button/button.svelte` now uses a targeted `HTMLAnchorAttributes` cast instead of `{...rest as any}`.
- ✅ Done: `input/input.svelte` now narrows `value` to `string | number | undefined`.
- ✅ Done: `icon/icon.svelte` now uses Hugeicons `IconSvgElement` / component prop types instead of broad `any`.
- Remaining: `accordion/accordion.svelte`, `calendar/calendar.svelte`, and `select/select.svelte` still use `value as any` and `rest as any`.
- Test wrappers also use `any`, but package exports are the higher priority.

Plan:

- Replace broad `any` with `unknown`, HTML element attribute types, or targeted library types. ✅ Done for Button, Input, and Icon.
- Split overloaded component props where necessary (e.g. Button anchor vs button props).
- Improve `Icon` prop typing from Hugeicons package exports if available; otherwise define a narrow accepted icon shape.
- For Bits UI wrappers, isolate unavoidable casts in typed helper functions rather than in component markup.

Verification:

- `rg -n "\\bany\\b|as any" packages/svelte/src/lib/components/ui packages/svelte/src/lib/types`
- `vp run --filter @neobr/svelte check`
- `vp run --filter @neobr/svelte build`

### 3. Revisit Bits UI compatibility wrappers

Evidence:

- `types/bits-ui-compat.ts` is intentionally broad but still does not prevent casts in Accordion, Calendar, and Select roots.
- Wrapper components bind values with union modes (`single`/`multiple`) that TypeScript cannot currently narrow at the call site.

Plan:

- Decide whether to expose separate single/multiple generic props or simplify to the concrete modes actually supported by the demos.
- Consider root wrapper helper types/functions to normalize value/type before passing to Bits UI.
- Add type-focused fixtures or compile-time tests for single vs multiple mode value types.

Verification:

- `vp run --filter @neobr/svelte check`
- `vp run --filter @neobr/svelte build`

## P2 - Test Coverage And Tooling Hygiene

### 4. Restore Select interaction tests

Evidence:

- `select/select.test.ts` has a large commented-out block with `TODO: Interaction tests fail in JSDOM with bits-ui currently`.
- Current Select tests only cover closed/default/disabled/placeholder/class behavior.

Plan:

- Try `@testing-library/user-event` or more complete pointer/keyboard event setup for Bits UI interactions.
- If JSDOM remains unsuitable, add a small browser-level test harness or document that Select interaction coverage is deferred to e2e.
- Cover open, select option, close on outside click, and keyboard navigation.

Verification:

- `vp run --filter @neobr/svelte test -- select`
- Optional browser/e2e command if introduced.

### 5. Reduce recurring SvelteKit tsconfig warning noise

Evidence:

- `vp run --filter @neobr/svelte check` and `build` pass but repeatedly print:
  `Your tsconfig.json should extend the configuration generated by SvelteKit: { "extends": "./.svelte-kit/tsconfig.json" }`.
- The package currently extends `../../tsconfig.json` and includes `svelte.config.js`.

Plan:

- Confirm whether this package should be a pure `svelte-package` library config or a SvelteKit workspace config.
- Evaluate using `svelte-kit sync` before checks/builds, or updating tsconfig structure if it does not break packaging.
- Avoid introducing generated files into tracked source.

Verification:

- `vp run --filter @neobr/svelte check` with no warning banner if feasible.
- `vp run --filter @neobr/svelte build`

### 6. Add a focused smoke test for package exports

Evidence:

- `pack:check` verifies file contents but does not import the packed/compiled exports.
- The library has many subpath exports in `package.json` that can drift from generated `dist` files.

Plan:

- Add a script that runs after `svelte-package` and checks every package export path resolves to existing JS and `.d.ts` files.
- Optionally import selected JS exports in Node for non-component utilities (`utils`, `form`, `toast`).

Verification:

- New script, e.g. `vp run --filter @neobr/svelte exports:check`.
- `vp run --filter @neobr/svelte build && vp run --filter @neobr/svelte exports:check`.

## P3 - Internal Architecture Cleanup

### 7. Refactor overlay element capture away from `bind:this` where useful

Evidence:

- `modal.svelte`, `sheet.svelte`, and `dropdown-menu.svelte` still use `bind:this`.
- Svelte autofixer suggests attachments/actions could make this easier to read.
- `utils/overlay.svelte.ts` now centralizes overlay logic but still relies on content getter closures.

Plan:

- Evaluate a Svelte attachment/action that registers overlay content elements with the controller.
- Keep behavior identical for focus trap, restoration, stack ordering, and Escape handling.
- Only refactor if readability improves; do not churn for its own sake.

Verification:

- `vp run --filter @neobr/svelte test -- modal sheet dropdown-menu popover`
- `vp run --filter @neobr/svelte check`

### 8. Deduplicate Calendar and DatePicker grid rendering

Evidence:

- `calendar/calendar.svelte` contains an inline note that grid rendering is duplicated with `date-picker.svelte`.
- Duplicated class strings and layout increase maintenance cost for date UI changes.

Plan:

- Extract a shared rendering helper/component that can accept the relevant Bits UI primitives while preserving context.
- Keep API unchanged for Calendar and DatePicker consumers.
- Add regression tests for selected/today/outside-month classes if feasible.

Verification:

- `vp run --filter @neobr/svelte test -- calendar date-picker`
- `vp run --filter @neobr/svelte check`

### 9. Improve Toast state determinism and testability

Evidence:

- `toast/toast-state.svelte.ts` uses `crypto.randomUUID()` and `setTimeout` directly.
- Tests cover custom duration, but injected clocks/ID factories would make state tests more deterministic.

Plan:

- Consider an internal factory or injectable ID/timer helpers for tests while keeping public API unchanged.
- Ensure auto-dismiss cleanup is deterministic under fake timers.
- Avoid SSR shared-state concerns if toast state is ever imported during server rendering.

Verification:

- `vp run --filter @neobr/svelte test -- toast`
- `vp run --filter @neobr/svelte check`

## P4 - Docs And Demo Polish

### 10. Remove demo `console.log` and tighten docs examples

Evidence:

- `apps/docs/src/routes/components/form/+page.svelte` logs submitted values to the console.
- Some docs examples use decorative `z-10` classes; these are less risky than layout layers but still hard-coded.

Plan:

- Replace console logging with toast/demo state output.
- Review docs examples for unnecessary hard-coded layer classes.
- Keep decorative z-index classes only when they are clearly local and not global layering.

Verification:

- `vp run --filter docs check`
- `vp run --filter docs build`

### 11. Move or rename colocated test wrappers if they keep creating packaging complexity

Evidence:

- Many `*-test-wrapper.svelte` files live beside public components under `src/lib/components/ui`.
- `pack:check` now prevents shipping them, but colocated wrappers increase package exclude complexity.

Plan:

- Consider moving wrappers to `src/tests/components` or inlining small wrappers in test files.
- Keep imports simple and avoid breaking svelte-package output.

Verification:

- `vp run --filter @neobr/svelte test`
- `vp run --filter @neobr/svelte build`
- `vp run --filter @neobr/svelte pack:check`

## Recommended Execution Order

1. Convert Tabs and RadioGroup to typed context modules.
2. Restore Select interaction coverage or document a browser-test path.
3. Reduce public `any`/casts in Button, Input, Icon, and Bits UI wrappers.
4. Add compiled export smoke checks.
5. Investigate the recurring SvelteKit tsconfig warning.
6. Evaluate overlay attachment refactor.
7. Deduplicate Calendar/DatePicker rendering.
8. Polish docs demos and revisit colocated test wrappers.

## Done Criteria

- `vp run --filter @neobr/svelte test` passes.
- `vp run --filter @neobr/svelte check` has 0 warnings.
- `vp run --filter @neobr/svelte build` passes.
- `vp run --filter @neobr/svelte pack:check` passes.
- `vp run --filter docs check` has 0 warnings.
- `vp run --filter docs build` passes.
- Any new package/export guard passes in CI-equivalent commands.
- New tests cover Select interactions or explicitly document why they require browser/e2e coverage.
