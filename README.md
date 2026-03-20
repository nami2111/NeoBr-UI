# ⚡️ NeoBr-UI

[![npm version](https://img.shields.io/npm/v/@neobr/svelte.svg?style=flat-square)](https://www.npmjs.com/package/@neobr/svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dw/@neobr/svelte.svg?style=flat-square)](https://www.npmjs.com/package/@neobr/svelte)

**NeoBr-UI** is a high-performance, accessible, and stunningly beautiful **Neo-Brutalist** component library built for the modern web. It combines raw industrial aesthetics with a technical mono-aesthetic, high-end animations, and a developer experience focused on Svelte 5 logic.

---

## ✨ Features

- 🏗 **Svelte 5 Runes**: Built from the ground up with Svelte 5 logic (`$state`, `$derived`, `$effect`).
- 🎨 **Tailwind CSS v4 Ready**: CSS-first design system optimized for the next generation of Tailwind.
- ♿ **Accessibility First**: Keyboard navigation and screen-reader support built into every component.
- ⚡ **Performance**: Zero-runtime overhead for styling, powered by pure CSS and Svelte snippets.
- ✅ **Zod Validation**: Built-in utilities for type-safe form validation with Svelte 5 runes.
- 🛠 **Customizable**: Token-based design system that's easy to theme and extend.

---

## 📦 Installation

To use NeoBr-UI in your project, install both the Svelte library and the Tailwind preset:

```bash
pnpm add @neobr/svelte @neobr/tailwind-preset
```

### ⚙️ Setup

1. **Import the styles** in your global CSS file (e.g., `app.css`):

```css
@import "tailwindcss";
@import "@neobr/tailwind-preset/style";

/* Ensure your project scans the component library */
@source "../node_modules/@neobr/svelte/dist";
```

1. **Configure your project** to use the "JetBrains Mono" font for the full technical aesthetic.

### 🌳 Tree-shaking & Sub-path Exports

NeoBr-UI supports granular sub-path exports for optimal tree-shaking. Instead of importing from the main entry point, you can import specific components:

```svelte
<script>
  import { Button } from "@neobr/svelte/button";
  import { createFormState } from "@neobr/svelte/form";
</script>
```

---

## 🚀 Usage

```svelte
<script>
  import { Button, Card, CardHeader, CardTitle } from "@neobr/svelte";
</script>

<Card>
  <CardHeader>
    <CardTitle>Hello Brutalist World</CardTitle>
  </CardHeader>
  <CardContent>
    <Button onclick={() => alert('Clicked!')}>
        Action Button
    </Button>
  </CardContent>
</Card>
```

---

## 🏗 Repository Structure

- `packages/svelte`: Core Svelte 5 components.
- `packages/tailwind-preset`: The CSS-first token system and Tailwind v4 configuration.
- `apps/docs`: The official documentation and interactive playground.

---

## 🛠 Development

Powered by [Vite+](https://viteplus.dev) — unified toolchain for dev, build, test, lint, and format.

```bash
vp install                  # Install dependencies
vp run --filter docs dev    # Start docs dev server
vp run build                # Build all packages
vp run test                 # Run all tests
vp check                    # Format + lint + type-check
```

---

## 📜 License

Distributed under the [MIT License](./LICENSE).

---

<div align="center">
  <sub>Built with 🖤 by the NeoBr-UI Contributors</sub>
</div>
