# NeoBr-UI

[![npm version](https://img.shields.io/npm/v/@neobr/svelte.svg?style=flat-square)](https://www.npmjs.com/package/@neobr/svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dw/@neobr/svelte.svg?style=flat-square)](https://www.npmjs.com/package/@neobr/svelte)
[![skills.sh](https://skills.sh/b/nami2111/NeoBr-UI)](https://skills.sh/nami2111/NeoBr-UI)

A **Neo-Brutalist** component library for Svelte 5 — high-contrast, thick borders, centered shadows, and technical typography. Built with Tailwind CSS v4 and OKLCH color tokens.

---

## Features

- **Svelte 5 Runes** — Uses `$state`, `$derived`, `$effect`, `$bindable`, and snippets throughout.
- **Tailwind CSS v4** — CSS-first design system with zero-config `@utility` classes and `@theme` tokens.
- **Accessibility** — Keyboard navigation, ARIA attributes, focus trapping, and screen-reader support in every component.
- **Tree-shaking** — Granular sub-path exports (`@neobr/svelte/button`, `@neobr/svelte/form`) for minimal bundle size.
- **Zod Validation** — Built-in form state management with reactive runes and type-safe schema validation.
- **OKLCH Colors** — Perceptually uniform color space with automatic dark mode support.
- **Reduced Motion** — Component transitions respect `prefers-reduced-motion` without global CSS overrides.

---

## Installation

Install the component library:

```bash
pnpm add @neobr/svelte
```

### Setup

1. Import the design system in your global CSS file:

```css
@import "tailwindcss";
@import "@neobr/svelte/style";

@source "../node_modules/@neobr/svelte/dist";
```

2. Optionally load **JetBrains Mono** in your project for the full technical aesthetic. NeoBr-UI exposes font tokens but does not override your app body font.

### Sub-path Imports

Import individual components for optimal tree-shaking:

```svelte
<script>
  import { Button } from "@neobr/svelte/button";
  import { createFormState, z } from "@neobr/svelte/form";
</script>
```

---

## Usage

```svelte
<script>
  import { Button, Card, CardContent, CardHeader, CardTitle } from "@neobr/svelte";
</script>

<Card>
  <CardHeader>
    <CardTitle>Hello Brutalist World</CardTitle>
  </CardHeader>
  <CardContent>
    <Button onclick={() => alert('Clicked!')}>Action Button</Button>
  </CardContent>
</Card>
```

---

## AI Skills

NeoBr-UI ships installable skills for assistants that support the `SKILL.md` format.

```bash
npx skills add nami2111/NeoBr-UI
```

- `neobr-ui-builder`: helps build Svelte 5 UI with `@neobr/svelte` components.
- `neobr-ui-theming`: helps install, theme, and troubleshoot NeoBr-UI with Tailwind CSS v4.

---

## Design Tokens

The design system exposes CSS custom properties for theming:

| Token                              | Description                              |
| ---------------------------------- | ---------------------------------------- |
| `--radius-brutalist`               | Default border radius (0px sharp)        |
| `--radius-brutalist-soft`          | Soft border radius (6px)                 |
| `--radius-brutalist-rounded`       | Rounded border radius (12px)             |
| `--shadow-brutalist`               | Centered bottom shadow (0px 5px 0px 0px) |
| `--shadow-brutalist-hover`         | Deepened hover shadow (0px 8px 0px 0px)  |
| `--z-dropdown` through `--z-toast` | Z-index scale for layering               |

Dark mode activates by adding the `.dark` class to a parent element. All tokens are defined in OKLCH.

---

## Repository Structure

| Package                    | Description                            |
| -------------------------- | -------------------------------------- |
| `packages/svelte`          | Core Svelte 5 component library        |
| `apps/docs`                | Documentation and interactive showcase |

---

## Development

Uses [Vite+](https://viteplus.dev) as the unified toolchain.

```bash
vp install                     # Install dependencies
vp run --filter docs dev       # Start docs dev server
vp run build                   # Build all packages
vp run test                    # Run all tests
vp check                       # Format + lint + type-check
```

---

## License

[MIT](./LICENSE)
