---
name: neobr-ui-theming
description: Install, configure, and theme NeoBr-UI in Svelte apps. Use this whenever the user asks to set up @neobr/svelte, fix missing NeoBr-UI styles, configure Tailwind CSS v4 for NeoBr-UI, customize Neo-Brutalist colors, radius, shadows, dark mode tokens, fonts, or migrate styling from older NeoBr-UI versions.
---

# NeoBr-UI Theming

Set up `@neobr/svelte` with Tailwind CSS v4 and customize the public design tokens. Do not edit NeoBr-UI package internals in consumer apps.

## Requirements

- Svelte `>=5.40.0 <6`
- Tailwind CSS v4
- Node.js 18+

## Install

```bash
pnpm add @neobr/svelte
```

Use the user's package manager if they already use `npm`, `pnpm`, `yarn`, or `bun`.

## CSS Setup

Add this to the app's global CSS file, commonly `src/app.css`.

```css
@import "tailwindcss";
@import "@neobr/svelte/style";

@source "../node_modules/@neobr/svelte/dist";
```

The `@source` line helps Tailwind scan packaged component classes. Adjust the relative path only if the CSS file is not under `src/`.

## Token Overrides

Override tokens after importing `@neobr/svelte/style`.

```css
@import "tailwindcss";
@import "@neobr/svelte/style";

@source "../node_modules/@neobr/svelte/dist";

@theme {
    --color-primary: oklch(78.5% 0.08 270);
    --color-secondary: oklch(81.5% 0.12 45);
    --font-neobr-mono: "JetBrains Mono", monospace;
    --radius-brutalist: 0px;
    --radius-brutalist-soft: 8px;
    --radius-brutalist-rounded: 12px;
    --lift-brutalist: 2px;
    --press-brutalist: 5px;
}

.dark {
    --color-primary: oklch(72.5% 0.12 270);
}
```

## Important Tokens

- Colors: `--color-background`, `--color-foreground`, `--color-primary-*`, `--color-secondary-*`, `--color-destructive-*`, `--color-success-*`, `--color-warning-*`, `--color-muted-*`, `--color-accent-*`, `--color-card-*`, `--color-ring`.
- Radius: `--radius-brutalist`, `--radius-brutalist-soft`, `--radius-brutalist-rounded`.
- Shadow and motion: `--shadow-brutalist`, `--shadow-brutalist-hover`, `--lift-brutalist`, `--press-brutalist`, `--press-brutalist-sm`.
- Layers: `--z-select`, `--z-dropdown`, `--z-modal`, `--z-sheet`, `--z-popover`, `--z-tooltip`, `--z-toast`.
- Font: `--font-neobr-mono`.

## Optional Font Setup

NeoBr-UI exposes font tokens but does not override the app body font. Add JetBrains Mono only if the app wants that visual style.

```svelte
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap"
        rel="stylesheet"
    />
</svelte:head>
```

## Migration Notes

- Replace removed `brutalist` boolean props with `radius="brutalist"`, `radius="soft"`, or `radius="rounded"`.
- Add padding explicitly to `card-brutalist` and `container-brutalist`; these utilities intentionally do not include padding.
- Consumer `class` overrides are expected to win, so prefer direct Tailwind classes over custom CSS when adjusting one component instance.

## Troubleshooting

- Components render unstyled: verify the global CSS imports `@neobr/svelte/style`.
- Some classes are missing after build: verify the `@source "../node_modules/@neobr/svelte/dist";` path.
- Theme override does nothing: place `@theme` overrides after the NeoBr-UI import.
- HugeIcons or date helper imports fail in app code: install `@hugeicons/core-free-icons` or `@internationalized/date` only if the app imports those packages directly.

