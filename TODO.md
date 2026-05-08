# NeoBr-UI Quality Remediation Plan

Deep code review findings and prioritized action plan to bring the library to production-grade maturity.

---

## Review Verdict

Well-architected, thoughtfully executed library ahead of most community efforts in Svelte 5 adoption and CSS-first design. The core patterns (CVA, tree-shaking sub-path exports, Tailwind v4 utilities, rune-based form validation) are sound. Primary gaps: SSR safety, z-index management, scroll-locking, and a few type mismatches. All fixable with focused effort.

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Default radius | **0px sharp** | True brutalist identity |
| Z-index approach | **Inline `style`** with `var(--z-*)` CSS tokens | Cleanest; Tailwind v4 doesn't support z-index from CSS vars in classes |
| SSR safety pattern | **`browser.ts` guard** | Works in any reactive context, not just `onMount` |
| Toast ID generation | **`crypto.randomUUID()`** | Collision-safe, modern |
| Button rest props | **Direct destructuring** | Removes `$derived` IIFE workaround |

---

## Phase 1: Foundation — SSR Safety & Type Correctness

**Goal:** Fix blockers preventing production SvelteKit usage. Est. ~3.5 hr.

---

### 1.1 — Create `browser.ts` utility

**Priority:** P0 (all Phase 2+ tasks depend on this)

New file: `packages/svelte/src/lib/utils/browser.ts`

```ts
export const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
```

Action: Export from `packages/svelte/src/lib/index.ts` barrel (add `export * from "./utils/browser"` or add to the existing `utils.ts`).

Verification: Import works from any component via `import { isBrowser } from "$lib/utils/browser"`.

---

### 1.2 — SSR-guard all DOM access

**Priority:** P0

Every component that touches `document` or `window` directly needs `import { isBrowser } from "$lib/utils/browser"` + guard.

| File | Line(s) | What to guard |
|------|---------|--------------|
| `modal.svelte` | `$effect` body (lines 112-129) | `previousFocus = document.activeElement`, `tick().then()` with `.focus()` |
| `toast.svelte.ts` | `setTimeout(...)` in `add()` (lines 33-35) | Wrap in `if (isBrowser)` |
| `sheet.svelte` | All `$effect` / focus management | Same pattern as modal |
| `popover.svelte` | Any portal rendering / DOM access | Conditional gating |
| `dropdown-menu.svelte` | Backdrop click handler DOM queries | Guard internal `document.activeElement` |
| `pagination.svelte` | Any `document` references | Conditional gating |

Pattern for `$effect` blocks:

```ts
$effect(() => {
    if (!isBrowser) return;
    // ... existing browser-only code
});
```

Pattern for `toast.svelte.ts`:

```ts
add(options: ToastOptions) {
    const id = crypto.randomUUID();
    // ... push toast ...
    if (isBrowser && toast.duration !== Infinity) {
        setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
}
```

Verification: `vp run --filter docs build` — must pass with zero `document is not defined` errors.

---

### 1.3 — Type mismatch fixes

**Priority:** P0

| File | Issue | Fix |
|------|-------|-----|
| `checkbox.svelte` | Props extend `HTMLAttributes<HTMLDivElement>` but render `<input>` | Change to `Omit<HTMLInputAttributes, "type">` since `type="checkbox"` is hardcoded. Split the visual wrapper div from input props. |
| `select.svelte:28` | `[key: string]: any` defeats types | Remove index signature. Let `CompatibleSelectProps` handle type narrowing. Keep `as any` on bits-ui bindings (necessary). |
| `button.svelte:79-92` | `$derived` IIFE to destructure rest props | Replace with direct destructuring (see Task 4.1 — do together) |

---

### 1.4 — Modal a11y cleanup

**Priority:** P1

In `modal.svelte`:

- [ ] Replace raw SVG close button (lines 172-183) with `<Icon icon={Cancel01Icon} class="h-4 w-4" />`
- [ ] Import `Cancel01Icon` from `@hugeicons/core-free-icons`
- [ ] Remove both `svelte-ignore` suppressions (lines 142-143)
- [ ] Add to backdrop div:
  - `onkeydown={(e) => e.key === "Enter" && handleClose()}`
  - `role="button"`
  - `tabindex="-1"`
  - `aria-label="Close modal"`

---

## Phase 2: Infrastructure — Z-Index, Scroll Lock, Motion

**Goal:** Standardize cross-cutting concerns across all components. Est. ~2.5 hr. Depends on browser.ts from Phase 1.

---

### 2.1 — Z-index token system

**Priority:** P1

Add to `packages/svelte/src/lib/styles/design-system.css` `@theme` block:

```css
--z-dropdown: 40;
--z-modal-backdrop: 49;
--z-modal: 50;
--z-sheet: 55;
--z-popover: 60;
--z-tooltip: 70;
--z-toast: 100;
```

Replace all hardcoded `z-*` classes with inline styles referencing tokens:

| File | Element | Before | After |
|------|---------|--------|-------|
| `modal.svelte` | Backdrop div | `class="... fixed inset-0 ..."` | Add `style="z-index: var(--z-modal-backdrop)"` |
| `modal.svelte` | Content div | `class="... z-50 ..."` | Remove `z-50`, add `style="z-index: var(--z-modal)"` |
| `dropdown-menu.svelte` | Backdrop | `class="fixed inset-0 z-40"` | Remove `z-40`, add `style="z-index: var(--z-dropdown)"` |
| `sheet.svelte` | Overlay/content | Any `z-*` | → `style="z-index: var(--z-sheet)"` |
| `popover.svelte` | Portal | Any `z-*` | → `style="z-index: var(--z-popover)"` |
| `toaster.svelte` | Container | `z-[100]` | → `style="z-index: var(--z-toast)"` |
| `tooltip.svelte` | Portal | Any `z-*` | → `style="z-index: var(--z-tooltip)"` |

Sync: `cp packages/svelte/src/lib/styles/design-system.css packages/tailwind-preset/design-system.css`

---

### 2.2 — Scroll lock utility

**Priority:** P1

New file: `packages/svelte/src/lib/utils/scroll-lock.svelte.ts`

```ts
import { isBrowser } from "./browser";

let lockCount = 0;
const originalStyles: { overflow: string; paddingRight: string } = {
    overflow: "",
    paddingRight: "",
};

export function useScrollLock() {
    let locked = false;

    function lock() {
        if (!isBrowser || locked) return;
        locked = true;
        if (lockCount === 0) {
            originalStyles.overflow = document.body.style.overflow;
            originalStyles.paddingRight = document.body.style.paddingRight;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight =
                `${window.innerWidth - document.documentElement.clientWidth}px`;
        }
        lockCount++;
    }

    function unlock() {
        if (!isBrowser || !locked) return;
        locked = false;
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
            document.body.style.overflow = originalStyles.overflow;
            document.body.style.paddingRight = originalStyles.paddingRight;
        }
    }

    return { lock, unlock };
}
```

Integrate into:

- [ ] `modal.svelte`: In `$effect` — when `open → true`, call `lock()`. On `open → false` + cleanup return, call `unlock()`.
- [ ] `sheet.svelte`: Same pattern as modal.

---

### 2.3 — `prefers-reduced-motion` support

**Priority:** P2

Add to `design-system.css` (before any animations):

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

Sync CSS to preset package.

---

### 2.4 — Transition token system

**Priority:** P3

New file: `packages/svelte/src/lib/utils/motion.ts`

```ts
import { cubicInOut } from "svelte/easing";

export const TRANSITION_BRUTALIST = { duration: 150, easing: cubicInOut } as const;
export const TRANSITION_BRUTALIST_SLOW = { duration: 300, easing: cubicInOut } as const;
```

Update components to import and use these:

- [ ] `modal.svelte` — `fly` and `fade` calls
- [ ] `toaster.svelte` — `fly` in/out calls
- [ ] `checkbox.svelte` — `scale` transition
- [ ] `sheet.svelte` — any `fly` transitions

Add to `design-system.css` `@theme` block (for CSS-based transitions, not Svelte transitions):

```css
--transition-brutalist: 150ms ease-in-out;
--transition-brutalist-slow: 300ms ease-in-out;
```

---

## Phase 3: Design System Consolidation

**Goal:** Resolve inconsistencies between code, tokens, and documentation. Est. ~1 hr.

---

### 3.1 — Unify radius system around 0px sharp default

**Priority:** P2

Token changes in `design-system.css`:

```css
/* Keep primary token as 0px (sharp) — the true brutalist default */
--radius-brutalist: 0px;

/* Add explicit opt-in alternatives */
--radius-brutalist-soft: 6px;
--radius-brutalist-rounded: 12px;
```

Update `@utility` classes to use tokens (currently hardcode values):

```css
@utility rounded-brutalist {
    border-radius: var(--radius-brutalist);        /* was: 0px */
}

@utility btn-brutalist {
    border-radius: var(--radius-brutalist);        /* was: 0px */
    box-shadow: var(--shadow-brutalist);
    /* ... rest unchanged ... */
}

@utility btn-brutalist-soft {
    border-radius: var(--radius-brutalist-soft);   /* was: 6px */
    /* ... */
}

@utility btn-brutalist-rounded {
    border-radius: var(--radius-brutalist-rounded); /* was: 12px */
    /* ... */
}
```

Update `AGENTS.md` line 217: change `rounded-brutalist (12px)` → `rounded-brutalist (0px)`.

Sync CSS to preset package.

---

### 3.2 — Audit and align component default variants

**Priority:** P3

| Component | Current default | Should be |
|-----------|----------------|-----------|
| `button.svelte` | `radius: "rounded"` (12px) | `radius: "brutalist"` (0px) |
| `badge.svelte` | `brutalist: true` → `rounded-brutalist` (0px) | Already correct |
| `switch.svelte` | `brutalist: true` → `rounded-brutalist` (0px) | Already correct |

Change `button.svelte` defaultVariants: `radius: "rounded"` → `radius: "brutalist"`.
Also update the prop default: `radius = "rounded"` → `radius = "brutalist"`.

---

## Phase 4: Polish & Cleanup

**Goal:** Remove dead code, fix small quality issues. Est. ~35 min.

---

### 4.1 — Button rest props simplification

**Priority:** P3

In `button.svelte`, replace lines 68-92 with direct destructuring:

```ts
let {
    class: className,
    variant = "default",
    size = "default",
    radius = "brutalist",
    href,
    children,
    ...rest
}: Props = $props();
```

Remove the `$derived` IIFE (lines 79-92), `$derived` wrappers on `variant`, `size`, `radius`, `href`, `children` (lines 71-76) — these are stable at parse time, not reactive.

This removes 14 lines of unnecessary overhead.

---

### 4.2 — Tabs dead code audit

**Priority:** P4

- [ ] Review `tabs-list.svelte` context interface — if `registerPanel` exists but is never consumed by `tabs.svelte`, remove it
- [ ] OR if `registerPanel` is intended for dynamic tab registration (future feature), add a `// TODO:` comment

---

### 4.3 — Toast ID collision fix

**Priority:** P3

In `toast.svelte.ts:22`:

```ts
// Before
const id = Math.random().toString(36).substring(2, 9);

// After
const id = crypto.randomUUID();
```

---

## Execution Order

```
Week 1   │ 1.1 browser.ts
         │ 1.2 SSR guards (depends on 1.1)
         │ 1.3 Type fixes (no deps)
         │ 1.4 Modal a11y (can overlap w/ 1.2)
         │
Week 2   │ 2.1 Z-index tokens (no deps)
         │ 2.2 Scroll lock (depends on 1.1)
         │ 2.3 Reduced motion (no deps)
         │ 2.4 Motion tokens (no deps)
         │
Week 3   │ 3.1 Radius unification (no deps)
         │ 3.2 Default variant audit (depends on 3.1)
         │
Week 4   │ 4.1 Button cleanup (no deps)
         │ 4.2 Tabs audit (no deps)
         │ 4.3 Toast ID (no deps)
```

---

## Verification Checklist

After all phases complete, run these checks:

```
[ ] vp run --filter docs build          # SSR build must pass
[ ] vp run -r test                       # All 44 component tests pass
[ ] vp check packages/svelte             # Format + lint + types clean
[ ] vp run --filter @neobr/svelte check  # svelte-check clean
[ ] Manual: Open modal → Escape closes, scroll locks
[ ] Manual: Open dropdown → backdrop z-index below modal
[ ] Manual: Navigate tabs → ARIA attributes correct in DevTools
[ ] Manual: Dark mode toggle → all z-index tokens still work
[ ] Manual: Toggle `prefers-reduced-motion` in browser → all animations disabled
```

---

## Files Affected Summary

### New files
- `packages/svelte/src/lib/utils/browser.ts`
- `packages/svelte/src/lib/utils/scroll-lock.svelte.ts`
- `packages/svelte/src/lib/utils/motion.ts`

### Modified files
| File | Phase | Change |
|------|-------|--------|
| `design-system.css` | 2.1, 2.3, 2.4, 3.1 | Z-index tokens, reduced motion, transition tokens, radius token cleanup |
| `tailwind-preset/design-system.css` | All CSS phases | Sync after each CSS change |
| `modal.svelte` | 1.2, 1.4, 2.1, 2.2 | SSR guard, a11y fix, z-index, scroll lock |
| `toast.svelte.ts` | 1.2, 4.3 | SSR guard, collision-safe ID |
| `toaster.svelte` | 2.1, 2.4 | Z-index, motion tokens |
| `dropdown-menu.svelte` | 1.2, 2.1 | SSR guard, z-index |
| `sheet.svelte` | 1.2, 2.1, 2.2 | SSR guard, z-index, scroll lock |
| `popover.svelte` | 1.2, 2.1 | SSR guard, z-index |
| `tooltip.svelte` | 2.1 | Z-index |
| `pagination.svelte` | 1.2 | SSR guard (if needed) |
| `checkbox.svelte` | 1.3, 2.4 | Type fix, motion tokens |
| `select.svelte` | 1.3 | Remove `[key: string]: any` |
| `button.svelte` | 1.3, 3.2, 4.1 | Type fix, default radius, rest props |
| `AGENTS.md` | 3.1 | Update radius documentation |
| `lib/index.ts` | 1.1 | Export browser utility |

---

## Future Strategic Items (Post-Remediation)

These are not in the current plan but should be tracked:

- [ ] **Visual regression testing** — Storybook + Chromatic or screenshot comparison in CI
- [ ] **Bundle size dashboard** — Per-component import size tracked in CI (key differentiator for component libraries)
- [ ] **Component scaffolding CLI** — `npx @neobr/cli add button` for copy-paste ownership (shadcn model)
- [ ] **SSR hydration test suite** — Dedicated test that renders all components server-side in SvelteKit
- [ ] **Mobile/touch audit** — Neo-brutalist borders and shadows can cause layout issues on small viewports
- [ ] **Input addon slots** — `prefix`/`suffix` snippet support on Input component
- [ ] **Combobox component** — Form-friendly combobox (separate from the command palette)
