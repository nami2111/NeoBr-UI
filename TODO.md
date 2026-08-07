# NeoBr-UI — Deep Analysis & Improvement Plan

> Generated 2026-02-16 (rev. 2). Baseline: 46 test files / 306 tests green, `@neobr/svelte` 2.0.1, 44 components, svelte-check 0/0.

---

## Completed (Phases 1–4, done earlier)

- **Phase 1 — Security**: 0 vulns (`pnpm audit --prod`). postcss override, svelte 5.56.8, vite 8.2.1 (catalog + override), vite-plus-core 0.2.8.
- **Phase 2 — Safe patches (8)**: kit 2.70.2, package 2.5.8, vite-plugin-svelte 7.2.0, svelte-check 4.7.4, tailwind 4.3.3, hugeicons 4.2.3, @internationalized/date 3.12.3, changesets 2.31.1. TypeScript 5.9.3 → 6.0.3.
- **Phase 3 — Code quality**: 3.1 form-validation (structuredClone + server-error clear + rethrow) — +2 tests; 3.2 overlay focus trap (contenteditable + detached-trigger guard); 3.3 toast id crypto fallback — +1 test; 3.4 modal close-button dedup; 3.5 select casts documented (structural, load-bearing); 3.6 jsdom noise (0 lines — `_virtualConsole.emit` patch in setup.ts); 3.7 `--color-border`/`--color-input` tokens.
- **Phase 4 — Node 22 gate**: GitHub CI removed (user choice). engines `>=20.19 || >=22`; jsdom 28→30, jest-dom 6.9.1→7.0.0 — no breaking changes surfaced. Lockfile −378 lines.
- **Hold**: TypeScript 7 — svelte-check@4.7.4 peer `^5||^6`. bits-ui 2.18.1 / hugeicons are latest.

---

## Phase 5 — UI / Style / Design / Micro-animation deep audit

Deep review of all 44 components + docs app + tokens (2026-02-16). Findings below are
verified by grep/read; the tooltip item is a reasoning-verified browser bug (jsdom can't run
Svelte transitions — like the 3.2 contenteditable caveat, flag for manual browser check).

### Strengths (keep, don't regress)

- Coherent brutalist identity: `border-2 border-foreground` hard edges + `shadow-brutalist` offset block + lift/press via `--lift-brutalist`/`--press-brutalist*` tokens.
- Radius system (`brutalist|soft|rounded`) on 19 components; state colors with hover/active pairs; class-based dark mode; z-scale tokens; `@utility` bundle (`btn-brutalist`, `input-brutalist`, `container-brutalist`, `card-brutalist`, …).
- JS transitions centralized in `utils/motion.ts` with reduced-motion zeroing (`duration()`), used by modal/sheet/dropdown/popover/tooltip/toaster/accordion/checkbox/radio.
- Focus-visible ring-2 ring-ring + ring-offset everywhere; no interactive element skips it.

### Findings to fix — [priority]

**F1 — Tooltip: transform clash (real in-browser bug)** `[high]`
`tooltip.svelte` positions via utility classes (`-translate-x-1/2 -translate-y-full` in `positions`) but animates with `transition:scale` — Svelte writes inline `transform: scale(…)` during the transition, which **overrides** the class translate → tooltip snaps off-position on open/close, then jumps back. jsdom can't reproduce (transitions don't run there — probe test showed no inline style written). All other transitions (fade/fly/slide/flip) are on elements with no translate utilities — only tooltip clashes.
→ Fix: split into **outer positioner** (no transition) + **inner animated** div; or drop scale → opacity-only `fade` + keep a tiny scale via CSS keyframe on inner. Browser-verify.

**F2 — Select / command popups use a THIRD motion dialect** `[select-content.svelte:16]`
`animate-fade-in` CSS class (theme: 0.3s ease-out + `scale(0.95)`) vs dropdown/popover Svelte `fade` 100ms; select has **no close transition** (CSS class animates in only). Also `command` shares the CSS class. → Unify select+command onto a small popup `fade`/`fly` Svelte transition in motion.ts (origin-aware for bottom/top), matching dropdown/popover, and delete the CSS-only usage.

**F3 — Popup surface mismatch** `[dropdown-menu.svelte:79 / select-content.svelte:15]`
dropdown/popover popups use `bg-background`, select uses `bg-card`, command? — unify the popover family to one surface (pick `bg-background`).

**F4 — Icon sizing is fake** `[icon.svelte / modal.svelte close / NAV_ICON_BUTTON]`
`Icon` default `size=24` + `strokeWidth=1.5` sets SVG attrs; callers pass `class="h-4 w-4"` (modal close, NAV_ICON_BUTTON in sheet etc.) — the box shrinks but the SVG stays 24px and overflows. Fix: make Icon size respond to a `size` prop honored in the class (`h-[16px]` etc.) or drop the class-techniques; audit NAV_ICON_BUTTON usages for icon size vs 8/9 box.

**F5 — Skeleton keyframes are component-scoped** `[skeleton.svelte]`
`@keyframes skeleton-shimmer` + `pulse-brutalist` live in the component `<style>` (scoped — consumers of the CSS-only system can't theme/override them; `:global(.dark)` hack). The theme's reduced-motion block already references `.animate-skeleton-shimmer`/`.animate-pulse` — move both keyframes into `design-system.css @theme` so the whole motion set is centralized, and delete the component-scope definitions.

**F6 — Docs app hardcodes legacy shadow (token drift)** `[apps/docs — 8 spots]`
`shadow-[0_5px_0_0_var(--color-shadow-color)]` duplicated across CodeBlock/CodePreview/home cards instead of `shadow-brutalist`. Fix: replace with the token (and `hover:shadow-brutalist-hover`).

**F7 — Press/interaction affordance audit** — design has two dialects:
- Lift/press group (shadow + translateY): button, NAV_ICON_BUTTON, bento-item, select-trigger (`focus-within:shadow-brutalist-hover`).
- Fill group (bg-accent): accordion-trigger, tabs-trigger, pagination, breadcrumbs, toggle(-group), menu items, ghost/link.
Gaps: ① accordion trigger presses (`active:translate-y`) but keeps its shadow (button removes it) — shadow stays. ② tabs/accordion/menu items have no hover-BORDER (fill only) while date/select triggers get full lift — decide and document one per group; fix accordion press-shadow. ③ Switch: no press feedback at all. Audit others (switch, slider thumb, checkbox) for hover/active.

**F9 — micro-nits** `[unify]`
- `pagination`/tabs section borders: we have `--separator-width: 3px` token only for separator — consider `--dense` borders on chips via `border-2`? skip unless cheap.
- Date-picker duplicates the `input-brutalist` recipe instead of reusing `@utility` — refactor (the `input-brutalist` utility is documented/dedupe).

### Plan items (each = 1 PR-ish step, gates below)

- [x] **P5-A1 (bug)** Tooltip transform clash — position/transition split (outer positioner div + inner scale-animated div, placement translate utilities on the outer only). Regression test added: asserts `role="tooltip"` box has no `-translate-*` classes while its positioned parent does. 307/307 tests, svelte-check 0/0, build + exports/pack/tree-shake + docs rc=0. NOTE: jsdom can't run Svelte transitions — visual check in browser still recommended before release
- [x] **P5-A2 (bugs + unify)** Popup motion system: `TRANSITION_POPUP()` helper added in `motion.ts` (fly y:-4, 150ms, cubicOut, reduced-motion-zeroed). dropdown + popover swapped `fade`(100ms) → `fly`; select-content dropped the CSS `animate-fade-in` class and wrapped its list in `<div transition:fly>` (bits-ui's popper layer has no built-in transition — wrapper was required; bits content mounts/unmounts with open so both in+out play). `animate-fade-in` keyframes remain in the theme (public CSS, other consumers). command is a static panel — untouched. 307/307, svelte-check 0/0, build + exports/pack/tree-shake + docs rc=0. browser-verify select open/close visually (jsdom can't run transitions)
- [x] **P5-B1 (consistency)** Popup surface → `bg-background` everywhere: select-content `bg-card` → `bg-background`, matching dropdown/popover/command (modal/sheet keep `bg-card`/`bg-background` large-surface choices). Comment added in select-content documenting the family rule. 307/307 (select 10/10), svelte-check 0/0, fmt clean
- [x] **P5-B2 (consistency)** Icon sizing: `icon.svelte` now forwards `className` to the SVG (HugeiconsIcon accepts `class`) — CSS size utilities override the `width`/`height` attrs, so `h-4 w-4`/`h-5 w-5` usages (modal/sheet close, pagination, calendar nav, error-boundary, date-picker) now render REAL sizes instead of 24px overflowing a smaller box. Regression test: svg gets `h-4 w-4` classes while `width` attr stays 24. Visual sizes change (modal close 24→16px, sheet close 24→20px) — browser check recommended. 308/308 (+1), svelte-check 0/0, build + exports/pack/tree-shake + docs rc=0, autofixer clean
- [x] **P5-C1 (maintainability)** Skeleton keyframes → central: `--animate-skeleton-shimmer` + `--animate-skeleton-pulse` tokens (+ keyframes) added to `design-system.css` @theme; sweep geometry moved to a global `.animate-skeleton-shimmer` rule (+ dark variant). skeleton.svelte `<style>` block deleted; root uses `animate-skeleton-pulse` (exact 0.7-dip timing preserved via renamed keyframes — avoids bleeding a global `.animate-pulse` override into consumers). Inner div `absolute inset-0` classes dropped (geometry rule carries position). Test updated. 308/308, svelte-check 0/0, build + checks + docs rc=0
- [x] **P5-C2 (drift)** Docs shadow token cleanup: 8× `shadow-[0_5px_0_0_var(--color-shadow-color)]` → `shadow-brutalist` across CodeBlock/CodePreview/+page/components/+page (value-identical, zero visual change). 2 remaining `shadow-[0_3px_0_0…]` are a distinct lighter shadow on decorative swatches — no token exists, intentional, left as-is. Docs build rc=0
- [x] **P5-D1 (polish)** Press-audit: accordion — N/A (no shadow; translate + hover-border already present). toggle — already full lift/press. tabs/pagination — flat fill-rows, press intentionally left (fill feedback suffices, documented). Added: switch track `transition-all` + `active:translate-y-[var(--press-brutalist-sm)] active:shadow-none` (matches button sm-press); slider thumb `transition-transform` + `peer-active:translate-y-[var(--press-brutalist-sm)]` (input got `peer`). Focus rings untouched (verified in classes). 308/308, svelte-check 0/0, fmt clean. Browser-verify press feel
- [ ] **P5-D2 (polish)** Home/landing micro-entry: bento/marquee/tooltip demos get a small CSS stagger (animation-delay + reduced-motion guard) in docs only — no library API change
- [ ] **P5-E (docs)** Tokens page: document `shadow-brutalist(-hover)`, motion tokens, radius options, `--color-border`/`input` aliases from 3.7

### Validation checklist (after each P5 item)

- [ ] `pnpm -C packages/svelte test` — 306+ green, no new jsdom noise
- [ ] `pnpm -C packages/svelte run check` — 0 errors / 0 warnings
- [ ] `pnpm -C packages/svelte run exports:check && pack:check && tree-shake:check` (after `vp run -r build`)
- [ ] `pnpm -C apps/docs build` rc=0
- [ ] `vp -C packages/svelte fmt --check .` — only CHANGELOG.md noise
- [ ] `pnpm audit --prod` — 0
- [ ] When behavior visible (A1/A2/D1/D2): manual browser check of the touched components — jsdom can't run Svelte transitions