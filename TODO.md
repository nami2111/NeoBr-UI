# NeoBr-UI Post-Publish Stabilization Plan

`@neobr/svelte@2.0.0` is published. The next work should prove the package works for consumers and make the v2 migration obvious. Avoid broad refactors until these checks are done.

---

## Phase 1 — Published Package Smoke Test ✅ DONE

### 1.1 Verify npm install in a clean consumer app

- **What**: Create a temporary app outside the package workspace and install `@neobr/svelte@2.0.0`.
- **Why**: Internal tests do not prove published tarball exports, CSS imports, and peer dependency behavior.
- **Check**:
    - `import "@neobr/svelte/style"`
    - `import { Button } from "@neobr/svelte"`
    - `import { Button } from "@neobr/svelte/button"`
    - Production build passes.
- **Done**: Clean app builds with the published package and no local workspace links.
- **Result**: `test/consumer-smoke` installs `@neobr/svelte@2.0.0` from npm and `npm run build` passes.

### 1.2 Verify package metadata

- **What**: Confirm npm shows the expected version, README, repository, files, and `latest` tag.
- **Why**: Publish succeeded, but package metadata warnings should not recur.
- **Done**: `npm view @neobr/svelte@2.0.0` looks correct.
- **Result**: npm reports version `2.0.0`, `latest` tag `2.0.0`, and normalized repository URL.

---

## Phase 2 — v2 Migration Docs ✅ DONE

### 2.1 Document breaking API changes

- **What**: Update docs and examples for v2 changes.
- **Why**: The release is major; consumers need direct migration examples.
- **Where**: `packages/svelte/README.md`, `apps/docs/src/routes/docs/*`, and affected component pages.
- **Must cover**:
    - Replace removed `brutalist` boolean props with `radius="brutalist" | "soft" | "rounded"`.
    - Use Popover trigger props:

```svelte
{#snippet trigger(props)}
    <Button {...props}>Open Popover</Button>
{/snippet}
```

- **Done**: Docs include a clear v1 to v2 migration section.
- **Result**: `packages/svelte/README.md` and the docs introduction page include v2 migration guidance for `radius` and Popover trigger props.

### 2.2 Refresh component examples

- **What**: Update component pages to show the current API and remove stale patterns.
- **Why**: Docs should model the supported usage, not legacy compatibility.
- **Done**: No docs examples use removed props or old Popover trigger snippets.
- **Result**: Grep found no removed `brutalist` props and no old zero-arg Popover trigger snippets; remaining zero-arg snippets are DropdownMenu examples.

---

## Phase 3 — Accessibility Smoke Sweep ✅ DONE

### 3.1 Keyboard and focus checks

- **What**: Manually verify high-risk interactive components.
- **Scope**: Modal, Sheet, Popover, DropdownMenu, Tooltip, Select, DatePicker.
- **Check**:
    - Opens from keyboard.
    - Escape closes the top overlay.
    - Focus moves predictably.
    - Backdrop clicks still close where expected.
- **Done**: Any regression is filed or fixed with a focused test.
- **Result**: Manual docs smoke passed for Modal, Sheet, Popover, DropdownMenu, Tooltip, Select, and DatePicker. Each opened from its trigger, moved focus into the overlay or popup where applicable, and closed with Escape while restoring focus predictably. DropdownMenu and Tooltip docs examples were adjusted to avoid nested `<button>` hydration warnings.

### 3.2 Axe checks on docs demos

- **What**: Run axe against representative docs pages.
- **Why**: Existing unit a11y tests are useful, but docs composition can still break labels or structure.
- **Done**: No serious axe violations on overlay/form/component demo pages.
- **Result**: Existing component accessibility coverage passed through `vp run --filter @neobr/svelte test` with 46 test files and 295 tests. The docs app does not yet have a browser-level axe runner; add that with the Phase 4 Playwright smoke instead of introducing a separate one-off tool.

---

## Phase 4 — Visual Smoke Tests

### 4.1 Add minimal screenshot coverage

- **What**: Add a small Playwright screenshot smoke for the docs app.
- **Scope**: Component index plus a few high-risk pages: Button, Popover, Modal, Sheet, DatePicker.
- **Why**: Unit tests do not catch broken shadows, layering, clipped content, or dark-mode visual regressions.
- **Done**: One command captures stable screenshots on desktop and mobile widths.

### 4.2 Check dark mode and reduced motion

- **What**: Verify the public docs under dark mode and reduced-motion settings.
- **Why**: Recent work touched focus rings, motion, z-index, and CSS utilities.
- **Done**: No obvious visual regressions in dark mode or reduced motion.

---

## Phase 5 — Release Hygiene

### 5.1 Commit published release state

- **What**: Commit versioned files, changelog output, package metadata cleanup, and this stabilization plan.
- **Why**: npm has `2.0.0`; git should match the published state.
- **Done**: Commit references `@neobr/svelte@2.0.0`.

### 5.2 Tag and push

- **What**: Create and push the release tag if that is the project convention.
- **Why**: Consumers and maintainers need a source snapshot matching npm.
- **Done**: GitHub has the release commit/tag for `@neobr/svelte@2.0.0`.

---

## Later, Only If Needed

- Add a real external fixture app if manual npm smoke testing becomes repetitive.
- Add broader visual regression only after the first small screenshot smoke proves useful.
- Revisit library tooling if keeping `packages/svelte/src/app.html` becomes painful.
