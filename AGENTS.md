# NeoBr-UI Agent Guidelines

High-performance, accessible Clean Neo-Brutalist component library built with **Svelte 5** and **Tailwind CSS v4**.

## Project Structure

```
neobr-ui/
├── packages/
│   ├── svelte/              # Core component library
│   │   ├── src/lib/
│   │   │   ├── components/  # UI components
│   │   │   ├── styles/      # design-system.css (Source of truth)
│   │   │   └── utils/       # Utility functions
│   │   └── package.json
│   └── tailwind-preset/     # CSS-first preset package
│       ├── design-system.css # Synced copy from packages/svelte
│       └── package.json
├── apps/
│   └── docs/                # SvelteKit documentation & Showcase
│       ├── src/app.css      # Imports @neobr/tailwind-preset/style
│       └── vite.config.ts   # Uses @tailwindcss/vite
└── package.json
```

## Build & Sync Commands

### Monorepo Management (Vite+)

Powered by [Vite+](https://viteplus.dev) — unified toolchain replacing pnpm scripts, vitest, prettier, and turbo.

```bash
vp install                  # Install all dependencies
vp run -r build             # Build all packages (dependency order)
vp run -r test              # Test all packages
vp check                    # Format + lint + type-check (Oxfmt + Oxlint)
```

### Package Filters

Instead of `cd`-ing into directories, use `--filter` or target packages directly:

| Command                               | Description                     |
| :------------------------------------ | :------------------------------ |
| `vp run --filter docs dev`            | Run documentation dev server    |
| `vp run @neobr/svelte#test`           | Run library tests               |
| `vp add --filter @neobr/svelte <pkg>` | Add dependency to Svelte lib    |
| `vp run --filter docs build`          | Build only the documentation    |
| `vp run -t @neobr/svelte#build`       | Build lib + its transitive deps |

**Filter Cheat Sheet:**

- `--filter docs...`: Docs + its local dependencies.
- `--filter @neobr/svelte...`: Svelte lib + its dependants.
- `--filter "./packages/*"`: All packages in `packages/` directory.
- `-r`: Run recursively across all workspaces in dependency order.
- `-t`: Run with all transitive dependencies.

### Key Vite+ Commands

| Command           | Replaces                    | Description                                |
| :---------------- | :-------------------------- | :----------------------------------------- |
| `vp dev`          | `vite dev`                  | Start dev server                           |
| `vp build`        | `vite build`                | Production build                           |
| `vp test`         | `vitest run`                | Run tests (use `vp run test` for monorepo) |
| `vp check`        | `svelte-check` + `prettier` | Format, lint, type-check                   |
| `vp fmt`          | `prettier`                  | Format only                                |
| `vp lint`         | `oxlint`                    | Lint only                                  |
| `vp pack`         | `svelte-package`            | Build library package                      |
| `vp run <script>` | `pnpm run <script>`         | Run package.json scripts                   |

### Design System Sync (CRITICAL)

Whenever `packages/svelte/src/lib/styles/design-system.css` is modified, you **must** sync it to the preset:

```bash
cp packages/svelte/src/lib/styles/design-system.css packages/tailwind-preset/design-system.css
```

### Tailwind v4 Setup in Apps

In `app.css` (Tailwind v4 style):

```css
@import "tailwindcss";
@import "@neobr/tailwind-preset/style";

/* Ensure monorepo scanning works */
@source "../../../packages/svelte/src/lib";
@source ".";
```

## Core Principles

1. **CSS-First Design (Tailwind v4)** - Define all theme variables in the `@theme` block in `design-system.css`. Avoid `tailwind.config.js`.
2. **Clean Neo-Brutalism** - High contrast, thick borders, centered-bottom shadows, zero gradients, technical typography.
3. **Technical Mono Aesthetic** - Use **JetBrains Mono** as the primary font for everything.
4. **Svelte 5 Patterns** - Use runes (`$state`, `$derived`, `$effect`), snippets over slots, and `$bindable()` for two-way state.
5. **Robust Component Utilities** - Prefer `@utility` classes like `btn-brutalist` and `rounded-brutalist` inside components over raw tailwind classes to ensure visual consistency.

## Component Style Pattern

### Button Example (Svelte 5 + CVA + v4 Utilities)

```svelte
<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../../../utils";

  const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
      variants: {
        variant: {
          default: "btn-brutalist bg-primary text-primary-foreground hover:bg-primary-hover",
          secondary: "btn-brutalist bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        },
        brutalist: {
          true: "rounded-brutalist tracking-[0.1em]", // Use wider letter spacing for a technical feel
          false: "rounded-md",
        }
      },
      defaultVariants: { variant: "default", brutalist: true }
    }
  );
</script>

<button class={cn(buttonVariants({ variant, brutalist, className }))} {...rest}>
  {@render children?.()}
</button>
```

## Design System Tokens (Tailwind v4)

### OKLCH Color Palette

All semantic colors should use OKLCH for better responsiveness and consistency.

- `--color-primary`: Lavender/Blue variant
- `--color-secondary`: Peach/Warm variant
- `--color-background`: Clean off-white
- `--color-foreground`: High-contrast dark

### Structural Tokens

- `--radius-brutalist`: **12px** (Standard rounding for buttons/cards)
- `--shadow-brutalist`: **0px 5px 0px 0px** (Centered bottom shadow, no horizontal offset)
- `--shadow-brutalist-hover`: **0px 8px 0px 0px** (Deepened bottom shadow)

### Typography

- **Font**: "JetBrains Mono", monospace (Primary)
- **Casing**: Prefer Title Case for headings, avoid forced `uppercase` unless specifically needed for micro-labels.
- **Cursor**: Always include `cursor-pointer` for interactive elements in their base style.

## Svelte 5 Runes Quick Guide

### $state & $derived

```typescript
let count = $state(0);
let doubled = $derived(count * 2);
```

### $bindable (Two-way Binding)

```typescript
// Child component
let { value = $bindable(0) } = $props();

// Parent component
<Slider bind:value={myValue} />;
```

## Brutalist Design Checklist

- [ ] **Centered Shadows** - Shadows must be `0px` horizontal offset.
- [ ] **Technical Font** - Ensure `JetBrains Mono` is loaded and applied.
- [ ] **Consistent Rounding** - Use `rounded-brutalist` (12px).
- [ ] **Shadow Usage** - Don't over-shadow; keep smaller elements like slider handles clean (border-only).
- [ ] **High Contrast** - Minimum black borders (`border-2` or thicker).
- [ ] **Micro-Interactions** - Use `cursor-pointer` and subtle `-translate-y-[2px]` on hover.

## Git Commit Conventions

`feat(button): add v4 utility pattern`, `fix(shadow): center shadow offset`.

## Accessibility Requirements

### Keyboard Navigation

All interactive elements should support standard keyboard patterns:

- **Buttons/Links**: `Enter` and `Space`.
- **Modals**: `Escape` to close, focus-trap, and focus-restoration.
- **Form Fields**: Clear `aria-describedby` for errors and `aria-required`.

### Screen Readers

- Use semantic HTML (`<button>`, `<nav>`, `<footer>`).
- Ensure `7:1` minimum contrast ratio (standardized via OKLCH tokens).

## Testing Guidelines

### Component Test Structure

Use `@testing-library/svelte` and `vite-plus/test`.

```typescript
import { render, screen } from "@testing-library/svelte";
import { expect, it } from "vite-plus/test";

it("applies neo-brutalist styling", () => {
    render(Button, { value: "Click" });
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("btn-brutalist"); // Verify core utility
});
```

## Resources

- **Svelte 5 Docs**: <https://svelte.dev>
- **Tailwind v4 Docs**: <https://tailwindcss.com/docs/v4-beta>
- **HugeIcons**: Primary icon library.
