# Documentation Site Hardening Plan

Goal: make the docs site accurate, scannable, mobile-safe, and release-ready without redesigning it or adding speculative demos.

## 1. Docs accuracy pass

- [x] Search docs for stale `@neobr/tailwind-preset` references and remove any remaining preset install instructions.
- [x] Confirm all setup snippets import `@neobr/svelte/style`.
- [x] Confirm install/setup docs explain that font tokens are opt-in and the library does not own the app body font.
- [x] Confirm form docs mention that only top-level string fields default to `""`.
- [x] Confirm form docs tell users to provide `initialValues` for number, boolean, array, object, and date fields.
- [x] Confirm Select, Accordion, and Calendar docs use `type="multiple"` whenever examples bind array values.
- [x] Confirm package/dependency notes match the current `@neobr/svelte` package surface.

## 2. Component page consistency

- [x] Audit component pages for a consistent section shape: Usage, variants/sizes/states, and short API notes where useful.
- [x] Keep existing page structure when it is already clear; do not rewrite pages just for uniformity.
- [x] Add missing accessibility notes only where the component behavior needs user awareness.
- [x] Add missing responsive behavior notes only where demos can mislead users on mobile.
- [x] Keep examples short and executable; avoid marketing copy and long explanatory prose.

## 3. Mobile docs QA

- [x] Run the docs app locally.
- [x] Check core docs pages at a narrow mobile width: home, installation, components index, modal, sheet, form, select, table.
- [x] Fix horizontal overflow in examples, code blocks, tables, and component preview wrappers.
- [x] Confirm modal and sheet demos remain usable on mobile.
- [x] Confirm header, sidebar/menu, and search controls do not overlap content.

## 4. Navigation and discovery

- [x] Review component index grouping and labels for scan speed.
- [x] Check active navigation state in the sidebar/header.
- [x] Check keyboard navigation for header links, mobile menu, search, and component links.
- [x] Improve search only if current search misses obvious component names or aliases.
- [x] Avoid a new navigation system unless the current one demonstrably blocks discovery.

## 5. Performance and accessibility sweep

- [ ] Run `vp run --filter docs check`.
- [ ] Run `vp run build`.
- [ ] Review build output for unusually large docs chunks before adding any new dependency or demo.
- [ ] Run an accessibility pass on key docs pages with existing tooling or browser checks.
- [ ] Fix heading order, focus visibility, contrast, and landmark issues found during the pass.

## 6. Release docs finish

- [ ] Update docs if the final release notes mention behavior not covered in the site.
- [ ] Keep the existing changeset as the source of package release notes.
- [ ] Do not add a large theme playground yet.
- [ ] Add richer examples only when a concrete docs gap appears during QA.

## Done Criteria

- [ ] `vp run --filter docs check` passes.
- [ ] `vp run build` passes.
- [ ] Key docs pages have no obvious mobile horizontal overflow.
- [ ] Installation and README examples match the current package API.
- [ ] Component pages do not document APIs that do not exist.
- [ ] Documentation changes stay focused on accuracy and usability, not redesign.
