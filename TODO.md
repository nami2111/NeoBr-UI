# NeoBr-UI Improvement Plan

Deep research findings and fix plan. Each issue includes location, problem description, and proposed fix.

---

## Critical Bugs

### 1. `tracking-brutalist` referenced but never defined

**Location:** `packages/svelte/src/lib/components/ui/link/link.svelte:23`
**Problem:** Link component uses `tracking-brutalist` utility class that doesn't exist in `design-system.css`. Silent failure — no letter-spacing applied.
**Fix:** Add `@utility tracking-brutalist` to `design-system.css` with `letter-spacing: 0.1em` (matches the `brutalist` tracking used in Button's brutalist variant).

---

### 2. `shadow-impact` referenced but never defined

**Location:** `packages/svelte/src/lib/components/ui/sheet/sheet.svelte:71`
**Problem:** Sheet uses `shadow-impact` class that doesn't exist in `design-system.css`. No shadow rendered.
**Fix:** Replace `shadow-impact` with `shadow-brutalist` which is the correct defined utility, or add a new `shadow-impact` utility if a distinct shadow style is intended.

---

### 3. `bg-glass` utility broken — OKLCH inside `rgb()`

**Location:** `apps/docs/src/app.css:34-37`
**Problem:** `--color-background` resolves to `oklch(...)` but `bg-glass` wraps it in `rgb()`, producing invalid CSS.
**Fix:** Replace with `color-mix()` or `oklch(from ...)` syntax:

```css
@utility bg-glass {
    backdrop-filter: blur(8px);
    background-color: oklch(from var(--color-background) l c h / 0.8);
}
```

---

### 4. Loading `className` applied twice

**Location:** `packages/svelte/src/lib/components/ui/loading/loading.svelte:41-42`
**Problem:** `className` is passed through CVA AND manually through `cn()`, resulting in duplicate class application.
**Fix:** Remove the redundant `className` spread — keep only the CVA output via `cn()`.

---

### 5. Skeleton dark mode selector mismatch

**Location:** `packages/svelte/src/lib/components/ui/skeleton/skeleton.svelte:47`
**Problem:** Uses `[data-theme="dark"]` selector but design system uses `.dark` class. Shimmer animation won't trigger in dark mode.
**Fix:** Change `[data-theme="dark"]` to `.dark` to match the design system's dark mode convention.

---

## Design System Inconsistencies

### 6. Button `default` and `primary` variants are identical

**Location:** `packages/svelte/src/lib/components/ui/button/button.svelte:15-18`
**Problem:** Both `default` and `primary` variants produce the exact same classes (`btn-brutalist bg-primary text-primary-foreground hover:bg-primary-hover`). Redundant.
**Fix:** Either remove the `primary` variant (since `default` already uses primary colors) or differentiate them — e.g., `default` as a lighter/subtler style and `primary` as the bold brutalist style.

---

### 7. `rounded-xs` is not a standard Tailwind class

**Location:** `packages/svelte/src/lib/components/ui/select/select-item.svelte:19`, `packages/svelte/src/lib/components/ui/skeleton/skeleton.svelte:14`
**Problem:** `rounded-xs` is not a recognized Tailwind utility. No rounding applied.
**Fix:** Replace with a valid class — `rounded-sm` (2px) for minimal rounding, or `rounded-brutalist` for consistency.

---

### 8. Progress uses `rounded-sm` instead of `rounded-brutalist`

**Location:** `packages/svelte/src/lib/components/ui/progress/progress.svelte:27`
**Problem:** Inconsistent with the design system's 12px brutalist rounding used everywhere else.
**Fix:** Replace `rounded-sm` with `rounded-brutalist`.

---

### 9. Switch `brutalist` implemented as CVA variant instead of boolean prop

**Location:** `packages/svelte/src/lib/components/ui/switch/switch.svelte`
**Problem:** Button, Badge, and Alert all use a `brutalist: true/false` boolean prop. Switch implements it as a CVA variant value — inconsistent API surface.
**Fix:** Refactor Switch to use a separate `brutalist` boolean prop matching the pattern in Button/Badge/Alert.

---

### 10. Label uses `font-medium`, FormLabel uses `font-bold`

**Location:** `packages/svelte/src/lib/components/ui/label/label.svelte:22` vs `packages/svelte/src/lib/components/ui/form/form-label.svelte`
**Problem:** Inconsistent font weight between Label and FormLabel.
**Fix:** Standardize both to `font-bold` (matches the technical mono aesthetic).

---

### 11. Skeleton uses `linear-gradient` — violates Neo-Brutalist principles

**Location:** `packages/svelte/src/lib/components/ui/skeleton/skeleton.svelte:35`
**Problem:** AGENTS.md specifies "zero gradients". Shimmer uses `linear-gradient` for its animation.
**Fix:** Replace with a flat opacity-based pulse animation or solid-color sliding bar using `@keyframes` with `background-position` instead of gradient stops.

---

### 12. `h-brutalist` utility defined but unused

**Location:** `packages/svelte/src/lib/styles/design-system.css:122-124`
**Problem:** No component references `h-brutalist`. It also forces `uppercase` which contradicts the AGENTS.md guideline of "avoid forced uppercase".
**Fix:** Either remove it as dead code, or repurpose it without `uppercase` if heading utility is needed.

---

### 13. Dark mode doesn't override semantic color tokens

**Location:** `packages/svelte/src/lib/styles/design-system.css:93-109`
**Problem:** The `.dark` block only overrides 11 of 33+ color tokens. Missing: `primary`, `primary-hover`, `primary-active`, `primary-foreground`, `secondary` (and variants), `destructive` (and variants), `success` (and variants), `warning` (and variants), `ring`.
**Fix:** Add dark mode overrides for all semantic colors. Use adjusted OKLCH values with higher lightness for better contrast on dark backgrounds. Sync to tailwind-preset.

---

## Accessibility Gaps

### 14. DropdownMenu: no keyboard navigation or proper trigger

**Location:** `packages/svelte/src/lib/components/ui/dropdown-menu/dropdown-menu.svelte`, `dropdown-menu-item.svelte`
**Problem:** No arrow key navigation between items, no Escape to close, trigger is a `<div>` with `role="button"` instead of a real `<button>`, items are `<div>`s without `role="menuitem"`, multiple a11y suppression comments.
**Fix:**

- Replace trigger `<div>` with `<button>`
- Add `role="menuitem"` and `tabindex="-1"` to items
- Implement arrow key navigation (Up/Down to move focus between items)
- Add Escape key handler to close menu
- Remove `svelte-ignore a11y` comments

---

### 15. Popover: missing ARIA attributes and keyboard support

**Location:** `packages/svelte/src/lib/components/ui/popover/popover.svelte`
**Problem:** No `aria-haspopup`, no `aria-expanded`, no Escape key to close, multiple a11y suppression comments.
**Fix:**

- Add `aria-haspopup="dialog"` and `aria-expanded={open}` to trigger
- Add Escape key handler
- Remove `svelte-ignore a11y` comments

---

### 16. Sheet: no Escape handling or focus trap

**Location:** `packages/svelte/src/lib/components/ui/sheet/sheet.svelte`
**Problem:** Modal has Escape key handling and focus trap. Sheet has neither — inconsistent accessibility between overlay components.
**Fix:**

- Add Escape key handler (same pattern as Modal)
- Add focus trap on open (same pattern as Modal)
- Add focus restoration on close

---

### 17. Tabs: missing `aria-controls` and `aria-labelledby`

**Location:** `packages/svelte/src/lib/components/ui/tabs/tabs-trigger.svelte`, `tabs-content.svelte`
**Problem:** Triggers lack `aria-controls` linking to panel IDs. Content panels lack `aria-labelledby` linking back to trigger IDs. Also, inactive panels are unmounted with `{#if}` instead of using `hidden` — destroys DOM state.
**Fix:**

- Generate unique IDs for triggers and panels
- Add `aria-controls={panelId}` on triggers
- Add `aria-labelledby={triggerId}` on content panels
- Keep all panels in DOM, toggle `hidden` attribute instead of unmounting

---

### 18. Tooltip: `role="button"` on div, no `aria-describedby`

**Location:** `packages/svelte/src/lib/components/ui/tooltip/tooltip.svelte:33`
**Problem:** Wrapper uses `role="button"` on a `<div>` instead of a `<button>`. No `aria-describedby` linking tooltip content to trigger for screen readers.
**Fix:**

- Replace `<div role="button">` with `<button>`
- Add unique ID to tooltip content
- Add `aria-describedby={tooltipId}` to trigger

---

### 19. CommandItem: `role="button"` on div

**Location:** `packages/svelte/src/lib/components/ui/command/command-item.svelte:39`
**Problem:** Uses `<div role="button">` instead of a semantic `<button>` element.
**Fix:** Replace `<div role="button">` with `<button>` element.

---

### 20. Multiple `svelte-ignore a11y` suppression comments

**Location:** `dropdown-menu.svelte`, `dropdown-menu-item.svelte`, `popover.svelte`
**Problem:** Accessibility warnings suppressed instead of fixed. Hides real issues from linters.
**Fix:** Address the underlying a11y issues (covered by #14 and #15), then remove the suppression comments.

---

## Architecture & Code Quality

### 21. Form module mixes Svelte 4 stores with Svelte 5 runes

**Location:** `packages/svelte/src/lib/components/ui/form/form-item.svelte:23`, `form-message.svelte:18`
**Problem:** Uses `writable()` Svelte 4 store alongside `$state`/`$effect` runes. Inconsistent patterns.
**Fix:** Migrate form context to use `$state` with getter/setter pattern (same as Collapsible's `COLLAPSIBLE_CONTEXT` which already does this correctly with Symbols).

---

### 22. Date-picker duplicates calendar grid rendering

**Location:** `packages/svelte/src/lib/components/ui/date-picker/date-picker.svelte:57-119`
**Problem:** ~60 lines of calendar grid rendering duplicated from `calendar.svelte`. Code duplication.
**Fix:** Extract the calendar grid into a shared internal component (e.g., `calendar-grid.svelte`) and import it in both Calendar and DatePicker.

---

### 23. String-based context keys instead of Symbols

**Location:** `tabs.svelte` (`"tabs"`), `radio-group.svelte` (`"radio-group"`), `toggle-group.svelte` (`"toggle-group"`)
**Problem:** String keys can collide if consumer also uses `setContext("tabs", ...)`. Collapsible and Command already use Symbols correctly.
**Fix:** Migrate tabs, radio-group, and toggle-group to Symbol-based context keys, consistent with collapsible and command.

---

### 24. Legacy v3 preset files are dead code

**Location:** `packages/tailwind-preset/index.js`, `packages/tailwind-preset/tokens.js`
**Problem:** `index.js` exports a Tailwind v3-style config (`module.exports`, `darkMode: ['class']`, `require('tailwindcss-animate')`). `tokens.js` uses hex fallbacks and different variable names (`--primary` vs `--color-primary`). These are unused in the v4 CSS-first architecture but still exported from the package.
**Fix:** Remove `index.js` and `tokens.js`. Update `package.json` exports to only export `./style` (the CSS file). The v4 `design-system.css` is the sole source of truth.

---

### 25. `as any` casts for bits-ui type compatibility

**Location:** `accordion.svelte:20,26`, `calendar.svelte`, `date-picker.svelte`, `select.svelte`
**Problem:** `as any` casts used to work around bits-ui type incompatibilities with Svelte 5. Hides real type errors.
**Fix:** Improve the type wrappers in `types/bits-ui-compat.ts` to properly map bits-ui generics to Svelte 5 `$bindable()` types, eliminating the need for `as any`.

---

### 26. Sticker: `Math.random()` at module level

**Location:** `packages/svelte/src/lib/components/ui/sticker/sticker.svelte:21`
**Problem:** `Math.random()` is called once at module load time. All Sticker instances in the same render pass share the same rotation value.
**Fix:** Move random rotation calculation into a `$derived` or `$state` so each component instance gets its own value.

---

### 27. Aspect ratio uses padding-bottom hack

**Location:** `packages/svelte/src/lib/components/ui/aspect-ratio/aspect-ratio.svelte`
**Problem:** Uses the old `padding-bottom` percentage hack for aspect ratio. Native CSS `aspect-ratio` property has 97%+ browser support.
**Fix:** Replace with `style="aspect-ratio: {ratio}"` using the native CSS property.

---

### 28. `animate-in`/`fade-in-0`/`zoom-in-95` are Tailwind v3 utilities

**Location:** `packages/svelte/src/lib/components/ui/select/select-content.svelte:14`
**Problem:** Uses `animate-in fade-in-0 zoom-in-95` which are Tailwind v3 animation utilities from `tailwindcss-animate`. These don't exist in Tailwind v4 without the plugin.
**Fix:** Replace with the v4 animation tokens defined in `design-system.css` (`--animate-fade-in`, `--animate-slide-up`) or define new `@keyframes` in `design-system.css` for enter/exit animations and add corresponding utilities.

---

## Execution Order

Fixes should be applied in this order to minimize conflicts:

1. **Phase 1 — Critical Bugs** (#1-5): Fix undefined classes, broken utilities, and dark mode selector
2. **Phase 2 — Design System** (#6-13): Normalize tokens, variants, and complete dark mode
3. **Phase 3 — Accessibility** (#14-20): Align all overlay/interactive components with Modal's a11y standard
4. **Phase 4 — Architecture** (#21-28): Migrate patterns, remove dead code, fix types

After each phase: `cp packages/svelte/src/lib/styles/design-system.css packages/tailwind-preset/design-system.css && pnpm -F @neobr/svelte test`
