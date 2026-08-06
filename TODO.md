# NeoBr-UI — Deep Analysis & Improvement Plan

> Generated 2026-02-16. Baseline: 46 test files / 303 tests green, `@neobr/svelte` 2.0.1, 44 components.
> Analysis reviewed: deps vs npm registry, `pnpm audit`, core utils (form-validation, overlay, scroll-lock, toast, motion), design tokens, CI, test setup, component patterns.

---

## Phase 1 — Security (do first, blocks release)

`pnpm audit --prod` reports **6 vulnerabilities (1 high, 5 moderate)**. All reachable through the published package's runtime graph.

- [x] **postcss** (HIGH: path traversal via source map auto-loading, GHSA-fxqj-rqcc-2cmp; + moderate incomplete-fix advisory, patched `>=8.5.23`)
  - `package.json` override `postcss@<8.5.10: >=8.5.10` → `"postcss@<8.5.23": ">=8.5.23"` ✅ (lock now single postcss 8.5.26)
  - pull chain: `vite-plus-core@0.2.4 → postcss@8.5.16` (runtime of dev toolchain only, but audit flags prod scope — fix anyway)
- [x] **svelte 5.53.12 → 5.56.8** (4 moderate: SSR XSS via promise serialization, DOM-clobbering XSS, ReDoS in `<svelte:element>`, all patched `>=5.55.7`; 5.56.8 is latest)
  - `packages/svelte` + `apps/docs`: `svelte: 5.53.12 → 5.56.8` ✅
  - verify peer range `>=5.40.0 <6` stays truthful: library uses `@attach` (svelte ≥5.29), `$props.id()` (≥5.20), `svelte/attachments` (≥5.40) — all safe within range ✅
- [x] **vite 8.0.13 → 8.2.1** (moderate, advisory blocks `<=8.0.15`) ✅
  - catalog: `vite: npm:@voidzero-dev/vite-plus-core@0.2.4 → 0.2.8`, `vite-plus: 0.2.4 → 0.2.8` in `pnpm-workspace.yaml` — NOTE: catalog alias does NOT move the real vite engine (vitest's vite dep); that needed override `"vite@>=8.0.0 <=8.0.15": ">=8.0.16"` in root package.json + `pnpm update --latest --recursive vite` (lock had pinned 8.0.13)
- [x] **undici** (moderate, patched `>=7.29.0`) — resolved by the vite/vitest bump; re-run audit ✅
- [x] `pnpm install && pnpm audit --prod` → **0 vulnerabilities** ✅
- [x] CI gate + full test suite: 303/303 tests, svelte-check 0 errors/0 warnings, full build, exports:check (142 paths) + pack:check (311 files) + tree-shake:check all OK ✅

No changeset: all changes are dev/toolchain — shipped tarball output unchanged, peer range untouched.

## Phase 2 — Safe patch updates (no breaking changes)

| Package | Current | Latest | Where |
|---|---|---|---|
| `@sveltejs/kit` | 2.69.2 | 2.70.2 | svelte, docs |
| `@sveltejs/package` | 2.5.7 | 2.5.8 | svelte |
| `@sveltejs/vite-plugin-svelte` | 7.0.0 | 7.2.0 | svelte, docs |
| `svelte-check` | 4.7.2 | 4.7.4 | svelte, docs |
| `tailwindcss` + `@tailwindcss/vite` | 4.3.2 | 4.3.3 | docs |
| `@hugeicons/core-free-icons` | 4.2.2 | 4.2.3 | svelte, docs |
| `@internationalized/date` | 3.12.2 | 3.12.3 | svelte, docs |
| `@changesets/cli` | 2.31.0 | 2.31.1 | root |
| `@testing-library/jest-dom` | 6.9.1 | 7.0.0 | svelte — **skip**, needs Node ≥22 (Phase 4) |
| `jsdom` | 28.1.0 | 30.0.1 | svelte — **skip**, needs Node ≥22 (Phase 4) |

- [x] apply table — all 8 updated (see above), skipped jest-dom/jsdom (Phase 4 gate), `pnpm install` ✅
- [x] full `pnpm test` 303/303 + `pnpm build` green ✅
- [x] `pnpm changeset` — skipped: dev-toolchain only, no shipped API change

## Phase 3 — Code quality (concrete findings, verified in source)

### 3.1 `src/lib/utils/form-validation.svelte.ts` — 2 real bugs
- [ ] **`cloneValue` silently corrupts non-JSON data**: `structuredClone` throws on Svelte state proxies → falls back to `JSON.parse(JSON.stringify())`, which drops `Date`, `undefined`, `BigInt` (breaks `z.date()` values on submit/reset). Fix: feature-detect and copy plain objects/arrays shallow-deep instead of JSON serialization; only full-clone what JSON can safely carry.
- [ ] **server-set errors never clear**: `setFieldError` (server validation) is not cleared by `handleChange`, so a failed submit leaves stale errors on the field forever after the user edits. Track server errors separately and clear them on change (or clear `errors[name]` in `handleChange` unconditionally).
- [ ] `handleBlur` writes `errors[name]`/`delete errors[name]` — works via `$state` proxy, but harden `validateField` to propagate non-Zod exceptions instead of returning `null` silently.

### 3.2 `packages/svelte/src/lib/utils/overlay.svelte.ts` — a11y + robustness
- [ ] `FOCUSABLE_SELECTOR` misses `[contenteditable]` (rich-text modal content can't be focused by the trap) — add it.
- [ ] `restoreFocus()` on a removed-from-DOM element throws silently (`previousFocus.focus()` when node unmounted) — guard with `document.contains()`.

### 3.3 `packages/svelte/src/lib/components/ui/toast/toast-state.svelte.ts`
- [ ] `crypto.randomUUID()` undefined in non-secure contexts (http LAN deploys) — add non-crypto fallback id (counter + random).

### 3.4 Duplication — close-button markup
- [ ] `modal.svelte` and `sheet.svelte` each inline the same 8×8 brutalist close button classes; `NAV_ICON_BUTTON` in `utils.ts` already exists for exactly this. Reuse it (watch that tailwind-merge still resolves consumer overrides — the constant is kept as expanded literals for that reason, so extraction is safe).

### 3.5 `select.svelte` / `bits-ui-compat.ts` type erosion
- [ ] `select.svelte` reaches for `value as never` + `rest as Record<string, unknown>` despite the `CompatibleSelectProps` layer existing. Re-shape the compat types so the casts die (bits-ui 2.x root props support generics; align `CompatibleSelectProps` to the installed 2.18 API).

### 3.6 Test infra
- [ ] jsdom noise floods every run (`Not implemented: getComputedStyle... pseudo-elements`, `HTMLCanvasElement.getContext`) — silence via vitest `environmentOptions`/suppressed virtual console.
- [ ] `setup.ts` hardcodes `matchMedia → matches:false` — add a small helper so reduced-motion branches (`duration()` in `utils/motion.ts`) are actually testable.

### 3.7 Design tokens — shadcn-compat gap
- [ ] No `--color-border` / `--color-input` tokens. Consumers migrating from shadcn expect `border-border`; the library deliberately aliases `muted`/`accent` for shadcn naming but skips `border`. Add `--color-border` (alias of foreground) or document the `border-foreground` alternative explicitly in README.

## Phase 4 — Node 22 upgrade (gated, unlocks majors)

`jsdom@30` needs `node ^22.22.2`; `@testing-library/jest-dom@7` needs `node >=22`; CI pins Node 20.

- [ ] Root `engines.node` → `>=20.19 || >=22` (keep 18 out), CI: `node-version: 20` → `22`
- [ ] Then: `jsdom` 28→30, `@testing-library/jest-dom` 6.9.1→7.0.0 (check breaking: matcher renames, default import removal)
- [ ] Full suite + build green, changeset

## Phase 5 — Explicitly hold

| Item | Why |
|---|---|
| `typescript 7.0.2` (native/Go) | `svelte-check@4.7.4` peer is `typescript ^5.0.0 \|\| ^6.0.0` — TS 7 unsupported. Re-evaluate when svelte-check ships support |
| `bits-ui 2.18.1` | already latest; don't chase 3.x until it's GA and peer-compatible |
| `@hugeicons/svelte 1.1.4` | latest |

## Validation checklist (every phase)

- [ ] `pnpm install` (lockfile diff reviewed, no surprise upgrades)
- [ ] `pnpm -C packages/svelte test` — 303 tests green, no new jsdom noise
- [ ] `pnpm -C packages/svelte run check` (svelte-check)
- [ ] `pnpm -C apps/docs build` (docs build incl. svelte-kit sync)
- [ ] `pnpm -C packages/svelte run exports:check && pack:check && tree-shake:check` (post-build guards)
- [ ] `pnpm lint` (per-package fmt check)
- [ ] `pnpm audit --prod` → 0 vulnerabilities
- [ ] changeset added per user-visible change (version bump released)