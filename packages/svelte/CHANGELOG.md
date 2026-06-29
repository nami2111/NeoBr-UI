# @neobr/svelte

## 1.2.0

### Minor Changes

- 7b0dfcc: Harden the component library for release.
    - Ship only the built `dist` package surface instead of `src/lib` source files.
    - Keep modal and sheet overlays responsive and accessible with viewport-safe modal widths, real backdrop buttons, and titled sheet dialog labels.
    - Stop the stylesheet from taking over consumer app fonts; use the optional `--font-neobr-sans` and `--font-neobr-mono` tokens when you want the NeoBr font stack.
    - Keep reduced-motion handling inside shared component transition constants instead of a global CSS override.
    - Standardize sheet close icons through the existing `Icon` wrapper.
    - Default missing form values to `""` only for top-level string fields. Provide `initialValues` for numbers, booleans, arrays, objects, and dates. Nested validation errors remain keyed by the top-level field.
    - Tighten `Select`, `Accordion`, and `Calendar` props so array values require `type="multiple"`.

## 1.1.2

### Patch Changes

- Refactor animations to CSS utilities and add effect cleanup
- Updated dependencies
    - @neobr/tailwind-preset@1.1.2

## 1.1.1

### Patch Changes

- Add z-index tokens and window component callbacks
- Updated dependencies
    - @neobr/tailwind-preset@1.1.1

## 1.1.0

### Minor Changes

- add7337: new SSR safety, scroll lock, z-index tokens, motion utils are new features

### Patch Changes

- Updated dependencies [add7337]
    - @neobr/tailwind-preset@1.1.0

## 1.0.15

### Patch Changes

- replace brutalist prop with flexible radius option
- Updated dependencies
    - @neobr/tailwind-preset@1.0.6

## 1.0.14

### Patch Changes

- update BentoGrid and DatePicker

## 1.0.13

### Patch Changes

- update @neobr/svelte README with preset setup and examples

## 1.0.12

### Patch Changes

- Fix critical bugs, improve accessibility, and modernize design system
- Updated dependencies
    - @neobr/tailwind-preset@1.0.5

## 1.0.11

### Patch Changes

- update dependencies

## 1.0.10

### Patch Changes

- fix dependency

## 1.0.9

### Patch Changes

- improve

## 1.0.8

### Patch Changes

- fix Modal Component Sizing Issue and Button Disabled Prop Reactivity Issue

## 1.0.7

### Patch Changes

- Fix broken exports configuration

## 1.0.6

### Patch Changes

- add more components

## 1.0.5

### Patch Changes

- Updated dependencies
    - @neobr/tailwind-preset@1.0.4

## 1.0.4

### Patch Changes

- Migrate Accordion and Select components to use bits-ui, alongside minor component adjustments

## 1.0.3

### Patch Changes

- Improvements of Critical Accessibility Gaps and Testing Coverage
- Updated dependencies
    - @neobr/tailwind-preset@1.0.3

## 1.0.2

### Patch Changes

- Added Command Palette, ScrollArea, Collapsible, and AspectRatio components.
- Updated dependencies
    - @neobr/tailwind-preset@1.0.2

## 1.0.1

### Patch Changes

- Initial release of the NeoBr-UI component library and Tailwind preset.
    - Core Svelte 5 components with Neo-Brutalist design.
    - Tailwind v4 compatible design system and preset.
    - HugeIcons integration.
    - Accessible and performant base components.

- Updated dependencies
    - @neobr/tailwind-preset@1.0.1
