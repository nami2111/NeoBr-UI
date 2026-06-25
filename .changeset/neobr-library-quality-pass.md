---
"@neobr/svelte": minor
---

Harden the component library for release.

- Ship only the built `dist` package surface instead of `src/lib` source files.
- Keep modal and sheet overlays responsive and accessible with viewport-safe modal widths, real backdrop buttons, and titled sheet dialog labels.
- Stop the stylesheet from taking over consumer app fonts; use the optional `--font-neobr-sans` and `--font-neobr-mono` tokens when you want the NeoBr font stack.
- Keep reduced-motion handling inside shared component transition constants instead of a global CSS override.
- Standardize sheet close icons through the existing `Icon` wrapper.
- Default missing form values to `""` only for top-level string fields. Provide `initialValues` for numbers, booleans, arrays, objects, and dates. Nested validation errors remain keyed by the top-level field.
- Tighten `Select`, `Accordion`, and `Calendar` props so array values require `type="multiple"`.
