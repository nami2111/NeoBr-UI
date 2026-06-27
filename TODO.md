# NeoBr-UI Polish Plan

Derived from the deep design-system analysis. Sequenced by impact: **correctness bugs first**, then **consistency**, then **polish**. Each item lists what, why, where, how, and a done-criterion.

Reference: analysis sections are cited as `(§N)`.

---

## Phase 1 — Correctness (a11y / dark-mode bugs, tiny diffs)

### 1.1 Global reduced-motion for CSS animations `(§4e)`

- **What**: Make `animate-*` utilities respect `prefers-reduced-motion` globally, not via opt-in class.
- **Why**: README claims "transitions respect prefers-reduced-motion without global CSS overrides" — true only for svelte `transition:` directives (via `motion.ts`). CSS animations (`animate-fade-in`, `animate-marquee`, `animate-neobr-tail`, `animate-progress-indeterminate`) ignore it unless consumer adds `.neobr-reduce-motion`. a11y gap + doc overclaim.
- **Where**: `packages/svelte/src/lib/styles/design-system.css` (the `@media (prefers-reduced-motion: reduce)` block).
- **How**: Replace the `:where(.neobr-reduce-motion, .neobr-reduce-motion *)` selector with a global `*` selector (or at minimum target `:where([class*="animate-"], .animate-*)`). Keep `animation-iteration-count: 1` so marquee/loading settle in a visible end-state instead of vanishing.
- **Done**: With OS reduced-motion ON and no wrapper class, marquee stops, loading dots are static-visible, progress-indeterminate bar is idle, select-content appears instantly. Re-verify the README claim is now fully true.

### 1.2 Ring-offset color everywhere `(§4b)`

- **What**: Add `ring-offset-background` to every focus-ring component that omits it.
- **Why**: Tailwind default ring-offset color is white → dark-mode produces a white halo between ring and element. Only `tabs` and `switch` set it today.
- **Where**: `button.svelte`, `badge.svelte`, `toggle.svelte`, `select-trigger.svelte`, `checkbox.svelte`, `accordion-trigger.svelte`, `radio-group-item.svelte`, `input` (via `input-brutalist` utility), `tabs-content.svelte`.
- **How**: Append `focus-visible:ring-offset-background` (or `ring-offset-background` in the base string) next to each `ring-offset-2`.
- **Done**: Toggle dark mode, Tab through every control — no white halo around any focus ring.

### 1.3 `focus-visible:` over `focus:` `(§4b)`

- **What**: Replace `focus:ring` / `focus:outline-none` with `focus-visible:` variants.
- **Why**: `focus:` shows the ring on every mouse click (annoying + non-standard). `focus-visible:` shows it only for keyboard nav.
- **Where**: `badge.svelte`, `toast.svelte`, `select-trigger.svelte` (the 3 files using non-visible `focus:`).
- **How**: `focus:ring-2` → `focus-visible:ring-2`, `focus:ring-ring` → `focus-visible:ring-ring`, `focus:outline-none` → `focus-visible:outline-none`.
- **Done**: Click each control with mouse → no ring flash. Tab to it → ring appears.

### 1.4 Sticker border clipped on shaped variants `(§4g)`

- **What**: Fix `border-2` being clipped away on `tape`/`jagged`/`star`/`circle` shapes.
- **Why**: `clip-path` clips the entire box including border → the 2px border renders jagged/incomplete on exactly the most creative shapes. Visible defect on a hero component.
- **Where**: `packages/svelte/src/lib/components/ui/sticker/sticker.svelte`.
- **How**: For clipped shapes, drop `border-2` and use `filter: drop-shadow(0 0 0 var(--color-foreground))` (or a stacked drop-shadow that mimics a 2px outline) so the "border" follows the clip outline. Keep `border-2` only for `rectangle`/`pill`. Alternatively: render border via a `::before` pseudo duplicated behind the clipped fill.
- **Done**: `tape`/`jagged`/`star`/`circle` stickers show a clean continuous outline matching the shape, not a clipped 2px box.

---

## Phase 2 — Consistency (turn a component set into a design system)

### 2.1 Unify the radius API `(§3)`

- **What**: Adopt the Button `radius?: "brutalist" | "soft" | "rounded"` enum across every bordered component; remove the `brutalist?: boolean` API.
- **Why**: Three radius APIs exist today (enum on Button, boolean on Badge/Alert/Switch, none on Input/Select/Checkbox/Toggle/Sticker). Consumers can't customize corners uniformly.
- **Where**: `badge.svelte`, `alert.svelte`, `switch.svelte`, `input.svelte` (+ `input-brutalist` utility), `select-trigger.svelte`, `checkbox.svelte`, `toggle.svelte`, `sticker.svelte`.
- **How**:
  - Add the `radius` prop (default `"brutalist"`) to each.
  - Map: `brutalist` → `rounded-brutalist` (0px), `soft` → `rounded-[6px]`/`rounded-brutalist-soft`, `rounded` → `rounded-[12px]`/`rounded-brutalist-rounded`.
  - Remove the `brutalist` boolean from Badge/Alert/Switch (breaking change → major version bump or deprecate with alias for one release).
  - Fix `checkbox.svelte`'s magic `rounded-[2px]` to use the enum.
  - Fix `input-brutalist` utility's hardcoded `rounded-brutalist-rounded` (12px) — it currently disagrees with the 0px default of `card-brutalist`/`container-brutalist`.
- **Done**: Every bordered component accepts the same `radius` enum with the same three values; defaults are consistent; the `rounded-[2px]` magic number is gone.

### 2.2 Kill or wire orphaned tokens `(§2)`

- **What**: Remove unused CSS tokens OR wire them into components. No token stays "decorative".
- **Why**: A theming consumer editing `--color-border`/`--color-input` sees no change — erodes trust in the system.
- **Where**: `packages/svelte/src/lib/styles/design-system.css` + components.
- **How** (recommend delete, simpler):
  - `--color-border` → delete (45 components use `border-foreground`; keep that as the canonical neobr border = foreground ink).
  - `--color-input` → delete (`input-brutalist` uses `bg-background`).
  - `--transition-brutalist` / `--transition-brutalist-slow` → delete (nothing reads `var(--transition-brutalist*)`; components use Tailwind `transition-all` or TS constants).
  - `--font-neobr-sans` → delete (identical to `--font-neobr-mono`; no sans exists). OR provide a real sans stack if a non-mono option is desired.
  - `--color-muted` ≡ `--color-accent` → keep both names (shadcn convention) but document they alias the same value, OR collapse to one.
- **Alternative** (if keeping tokens): switch components to `border-border` / `bg-input` / `var(--transition-brutalist)` so the tokens become the source of truth. Pick one direction, do it everywhere.
- **Done**: `grep` for each token name — either it's referenced in a component, or it's not in the CSS. No orphans. README token table matches reality.

### 2.3 Codify press-depth `(§4a)`

- **What**: Introduce press/lift tokens so all interactive controls share one interaction model.
- **Why**: Active-translate is 5px (button), 2px (accordion/window/modal-close/toggle), or none (select-trigger). Hover-lift is 2px or 1px. Ad-hoc per author.
- **Where**: `design-system.css` (new tokens) + `btn-brutalist` utility + `toggle.svelte`, `select-trigger.svelte`, `accordion-trigger.svelte`, `window.svelte`, `modal.svelte`.
- **How**:
  - Add tokens: `--lift-brutalist: 2px` (hover), `--press-brutalist: 5px` (active, = shadow height so it sits flat). Optionally `--press-brutalist-sm: 2px` for small controls (h-5 window buttons) where 5px is too much.
  - Update `btn-brutalist` utility to use them: `hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)]`.
  - Add the missing `active:translate-y` + `active:shadow-none` to `select-trigger.svelte` (currently lifts but never presses).
  - Decide: do small controls use `--press-brutalist-sm` (2px) or the full 5px? Pick one and apply uniformly.
- **Done**: Every shadowed control: rest → hover-lift 2px + deeper shadow → active-press (flat, shadow-none). Select-trigger now presses. No control has a hover-lift without an active-press.

### 2.4 One icon system `(§4c, §4d)`

- **What**: Use `<Icon>` (hugeicons) everywhere; remove inline `<svg>` from components.
- **Why**: 10 components inline raw SVG, 6 use `<Icon>`. Inline `stroke-width` is 3 in select-trigger, 4 in select-item/checkbox — inconsistent weight within the same family. Window uses Unicode glyphs `— □ ✕` (font-dependent, semantically odd "—" for minimize).
- **Where**: `accordion-trigger.svelte`, `loading.svelte`, `breadcrumb-separator.svelte`, `pagination-next/previous/ellipsis.svelte`, `toast.svelte`, `select-item.svelte`, `select-trigger.svelte`, `checkbox.svelte`, `window.svelte`.
- **How**: Map each inline SVG/glyph to a hugeicons equivalent (chevron-down for select-trigger, check for select-item/checkbox, chevrons for pagination, x for window close, minus for minimize, square for maximize). Use a single `stroke-width`/`size` convention via the Icon wrapper.
- **Done**: `grep -rn "<svg" components/` returns 0 hits. All icons render at consistent weight.

### 2.5 twMerge config for custom utilities `(§5)`

- **What**: Teach `cn()`/tailwind-merge that `btn-brutalist`, `card-brutalist`, `container-brutalist`, `rounded-brutalist*`, `shadow-brutalist*`, `input-brutalist` set border-radius / box-shadow / border, so consumer `class` overrides work.
- **Why**: twMerge's default config doesn't know custom `@utility` classes set `border-radius`/`box-shadow`. `<Button class="rounded-lg" />` keeps both `rounded-brutalist` and `rounded-lg`; winner is decided by CSS source order, not class order → silent override failures.
- **Where**: `packages/svelte/src/lib/utils.ts` (`cn` function).
- **How**: `extendTailwindMerge({ classGroups: { 'border-radius': ['rounded-brutalist', 'rounded-brutalist-soft', 'rounded-brutalist-rounded'], 'box-shadow': ['shadow-brutalist', 'shadow-brutalist-hover'], 'border-width': [...] } })` — group custom classes with their Tailwind equivalents so twMerge dedupes conflicts. Or restructure mega-utilities (`card-brutalist`/`container-brutalist`) into composable plain classes.
- **Done**: `<Button class="rounded-lg" />` reliably softens corners regardless of CSS source order. Document the override contract for consumers.

---

## Phase 3 — Polish (cleanup, convergence, packaging)

### 3.1 Progress animation into design-system.css `(§4f)`

- **What**: Move `@keyframes progress-indeterminate` + `:global(.animate-progress-indeterminate)` out of `progress.svelte`'s local `<style>` into `design-system.css` as `@utility animate-progress-indeterminate` + `@keyframes`.
- **Why**: Every other animation (marquee, neobr-tail, fade-in, slide-*) lives in the design system CSS; progress is the lone holdout. Also lets it inherit the global reduced-motion fix from 1.1.
- **Where**: `progress.svelte`, `design-system.css`.
- **Done**: `progress.svelte` has no `<style>` block; `animate-progress-indeterminate` works identically; reduced-motion tames it (verified in 1.1).

### 3.2 Dead/no-op classes cleanup `(§4h)`

- **What**: Remove redundant classes.
- **Why**: Noise; mild confusion for contributors reading variants.
- **Where**: `button.svelte` (`border-2` in `btn-brutalist` utility AND each variant; `tracking-[0.1em]` in all 3 radius variants = constant, move to base or use `tracking-brutalist` utility), `select-trigger.svelte` (`data-[state=open]:rotate-0` no-op).
- **How**: Delete duplicates; move constant `tracking` to base string or replace with the existing `tracking-brutalist` utility.
- **Done**: No duplicated `border-2` within a single component's class string; no no-op rotates.

### 3.3 Split "box" utility padding policy `(§6)`

- **What**: Remove `p-6` from `container-brutalist`; let callers add spacing.
- **Why**: `card-brutalist` has no padding; `container-brutalist` hardcodes `p-6`; `window.svelte` has to override with `p-0`. Inconsistent padding opinion across two "box" utilities.
- **Where**: `design-system.css` (`container-brutalist`), `window.svelte` (drop the `p-0` override), any consumer relying on the auto-padding (audit `grep -rn "container-brutalist"`).
- **How**: `container-brutalist` = bg + border + shadow + radius only. Update docs/usage to add `p-6` explicitly where wanted.
- **Done**: `container-brutalist` and `card-brutalist` have the same padding policy (none); `window.svelte` no longer needs `p-0`.

### 3.4 Overlay convergence `(§7)`

- **What**: Reduce from 4 overlay code paths to 2: bits-ui primitives + one shared custom controller.
- **Why**: Currently bits-ui + `useOverlayController` (modal) + `useDismissableOverlay` (popover) + raw hand-rolled (tooltip). More paths = more places for focus-trap/Escape/z-index bugs.
- **Where**: `utils/overlay.svelte.ts`, `tooltip.svelte`, `popover.svelte`, `modal.svelte`.
- **How**:
  - Fold `useDismissableOverlay` into `useOverlayController` (or vice versa) — one controller with a `trapFocus` option.
  - Migrate `tooltip.svelte` to use the shared controller instead of raw `onmouseenter`/`onfocusin`/`svelte:window onkeydown`.
  - Standardize entrance: pick svelte `transition:` for all overlays (modal/popover/tooltip) OR CSS `animate-*` for all — not mixed. (Recommend svelte transitions, since they already respect reduced-motion.)
- **Done**: One custom overlay controller in `overlay.svelte.ts`. Tooltip uses it. One animation approach for overlay entrance.

### 3.5 Popover trigger nesting footgun `(§8)`

- **What**: Stop wrapping the `trigger` snippet in a `<button>`; forward to the child.
- **Why**: `<button>{@render trigger()}</button>` produces nested buttons if the consumer passes a `<Button>` (itself a button/anchor) — invalid HTML, double fire.
- **Where**: `popover.svelte`.
- **How**: Use bits-ui's `Popover.Trigger` (as_child / `data-state` forwarding) like the other bits-ui-wrapped components do, OR render the trigger as a `<span>`/`<div>` with `role` and let the consumer own the button.
- **Done**: `<Popover trigger={<Button>...</Button>}>` renders one button, no nesting, single click.

### 3.6 Z-index as utilities `(§7)`

- **What**: Expose the `--z-*` scale as `@utility z-modal`, `z-popover`, etc.
- **Why**: Components set z-index via inline `style="z-index: var(--z-modal)"`, bypassing `class`. Consumers can't reason about or override layering through `class`, and twMerge never sees it.
- **Where**: `design-system.css` + inline `style` z-index usages across overlay components.
- **How**: Add `@utility z-modal { z-index: var(--z-modal) }` (and siblings) for each token. Replace `style="z-index: var(--z-modal)"` with `class="z-modal"`.
- **Done**: All overlay z-index expressed via `class`; no inline z-index `style` in components.

### 3.7 Packaging `(§9)`

- **What**: Small shipping/credibility wins.
- **Where**: `packages/svelte/package.json`, `pnpm-workspace.yaml`, README.
- **How**:
  - Add `"sideEffects": ["**/*.css"]` to `packages/svelte/package.json` → bundlers tree-shake the JS barrel.
  - `packages/tailwind-preset` is an empty dir (no `package.json`) — either build it or remove it from `pnpm-workspace.yaml`.
  - Remove `src/app.html` (app-template scaffold leftover in a library package).
  - Expand README "Design Tokens" table to document all tokens actually defined (`--separator-width`, `--font-*`, `--color-shadow-color`, `--animate-*`, full z-index scale incl. backdrops) — or auto-generate the table from the CSS.
- **Done**: `sideEffects` set; empty preset package resolved; README token table matches the CSS 1:1.

### 3.8 Motion: per-call reduced-motion check `(§motion.ts)`

- **What**: Make the reduced-motion check evaluate per transition, not once at module import.
- **Why**: `TRANSITION_BRUTALIST_*` constants call `duration(ms)` at import time → if a user toggles OS reduced-motion at runtime, transitions don't adapt. Also `matchMedia` undefined on SSR returns full duration (fine, but worth a note).
- **Where**: `packages/svelte/src/lib/utils/motion.ts`.
- **How**: Export a `brutalistTransition(opts)` factory that builds `{ duration, easing }` per call, reading `matchMedia` each time. Replace the static constants in callers, or keep constants as thin wrappers that call the factory.
- **Done**: Toggling reduced-motion at runtime changes transition behavior without a reload.

---

## Sequencing summary

| Phase | Items | Character | Effort |
|---|---|---|---|
| **1** | 1.1–1.4 | Correctness (a11y/dark-mode bugs) | Small diffs |
| **2** | 2.1–2.5 | Consistency (design-system coherence) | Medium, some breaking (2.1) |
| **3** | 3.1–3.8 | Polish (cleanup/convergence/packaging) | Medium, non-breaking |

Recommended order: ship Phase 1 immediately (bug fixes, no API change). Then Phase 2 in a major version (2.1 is breaking). Phase 3 anytime, ideally bundled with the major.

No rearchitecting required — the foundation (OKLCH tokens, CVA, bits-ui, a11y roles) is already correct. The work is converging the layers above the foundation onto the patterns the best components already demonstrate.
