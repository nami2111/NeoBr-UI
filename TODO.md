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
- [x] **`cloneValue` silently corrupts non-JSON data**: `structuredClone` throws on Svelte state proxies → fell back to `JSON.parse(JSON.stringify())`, dropping `Date`/`undefined`/`BigInt` (broke `z.date()` on submit). Fixed: structuredClone for plain data, `$state.snapshot` fallback for proxies — preserves all three ✅ + regression test "submit keeps Date values as Date instances"
- [x] **server-set errors never clear**: `setFieldError` (server validation) was not cleared by edit when `validateOnChange`/`validateOnBlur` off (or via `setFieldValue`). Fixed: `handleChange`/`handleBlur`/`setFieldValue` now unconditionally clear `errors[name]` before optional re-validation ✅ + regression test "clears server-set errors when the field changes without validation" (validateOnChange:false)
- [x] `validateField` now rethrows non-Zod exceptions instead of returning `null` silently ("Never mask an unexpected bug as a valid field")

### 3.2 `packages/svelte/src/lib/utils/overlay.svelte.ts` — a11y + robustness
- [x] `FOCUSABLE_SELECTOR` now includes `[contenteditable]:not([contenteditable="false"])` — rich-text areas (no native focusable shape) were invisible to the trap, so Tab from an editor escaped the overlay ✅
- [x] `restoreFocus()` guards `previousFocus.isConnected` — a trigger removed while the overlay was open used to get a silent no-op focus() and drop focus to body ✅
- note: couldn't write a jsdom regression test for contenteditable — jsdom doesn't implement contenteditable focus, the test passed vacuously with the fix removed. Fix is standard a11y practice; verify in real browser. Test dropped (YAGNI).

### 3.3 `packages/svelte/src/lib/components/ui/toast/toast-state.svelte.ts`
- [x] `crypto.randomUUID()` undefined in non-secure contexts (http LAN deploys) — `createToastId()` prefers `crypto.randomUUID`, falls back to monotonic counter + random suffix ✅ + regression test (stub `crypto: {}` → unique ids, dismiss works)

### 3.4 Duplication — close-button markup
- [x] `modal.svelte` close button now reuses `NAV_ICON_BUTTON` from `utils.ts` (via `cn`, which also resolves the `flex`→`inline-flex` conflict) + `hover:bg-accent inline-flex shrink-0` — class output byte-for-byte identical to the old literal, visual unchanged ✅
- [ ] `sheet.svelte` close button is a *different* visual (compact `p-1`/`hover:bg-muted`, no shadow) — reuse would change its look; kept as literal. Verified unique (no other component shares it).

### 3.5 `select.svelte` / `bits-ui-compat.ts` type erosion
- [x] **Casts are structural, not erosion — verified empirically**: bits-ui 2.18 `SelectRootProps` is a discriminated union (value?: string | string[] / type), and Svelte `bind:` narrows union-typed components to their LAST branch — a cast-free pass is impossible without changing the consumer API. `value as never` is assignable to both branches (runtime validates via `type`); the `Record<string, unknown>` rest-cast is load-bearing too — its index signature is what keeps TS from re-narrowing `{type}`. Both now carry a comment explaining why. `CompatibleSelectProps` confirmed aligned with the installed 2.18 API (value?: string/string[], type required per branch — the union also guards consumers: `type: "multiple"` required for arrays).
- [x] Bonus: fixed 2 new `state_referenced_locally` svelte-check warnings introduced by the 3.1 test wrapper (`validateOnChange`/`validateOnBlur` captured in `createFormState` options) — options are init-only by design, so silenced with `svelte-ignore` comments. Baseline 0 errors/0 warnings restored ✅

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
| ~~typescript 5.9.3 → 6.0.3~~ ✅ DONE | svelte-check@4.7.4 peer allows `^6.0.0`; upgraded, removed deprecated `baseUrl` from root tsconfig (paths resolve relative to tsconfig), 303/303 tests + svelte-check 0/0 + build green. TS 6 is the bridge to 7 — repo is now v7-ready apart from the svelte-check gate |
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