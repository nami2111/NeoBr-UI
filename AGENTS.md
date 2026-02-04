# NeoBr-UI Agent Guidelines

This file contains guidelines for agentic coding agents working in the NeoBr-UI repository.

## Project Overview

NeoBr-UI is a high-performance, accessible, and stunningly beautiful Neo-Brutalist component library for modern web development. The project uses a monorepo structure with pnpm workspaces.

## Build Commands

### Root Level

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests for all packages
pnpm test

# Run lint for all packages
pnpm lint

# Format all files
pnpm format
```

### Package Level (@neobr/svelte)

```bash
# Build the Svelte package
svelte-package

# Development server
vite dev

# Type checking
svelte-check --tsconfig ./tsconfig.json

# Lint with Prettier
prettier --check .

# Format with Prettier
prettier --write .

# Run tests
vitest run

# Watch tests
vitest

# Watch type checking
svelte-check --tsconfig ./tsconfig.json --watch
```

### Package Level (@neobr/tailwind-preset)

```bash
# Build the Tailwind preset
# (No specific build script - uses CommonJS exports)
```

### Documentation App

```bash
# Development server
pnpm --filter docs dev

# Build for production
pnpm --filter docs build

# Preview production build
pnpm --filter docs preview

# Type checking
pnpm --filter docs check

# Watch type checking
pnpm --filter docs check:watch
```

### Running Single Tests

```bash
# Run a specific test file
pnpm --filter svelte test path/to/test.test.ts

# Or within the package directory
cd packages/svelte && vitest run src/lib/components/ui/button/button.test.ts
```

## Code Style Guidelines

### General Principles

- **Neo Brutalism aesthetic**: Bold colors, thick borders, sharp shadows
- **Token-first design**: All visual values must come from design tokens
- **No hardcoded values**: Colors, spacing, radius must use tokens
- **TypeScript strict mode**: All code must be type-safe
- **Accessibility first**: WCAG AAA compliance for contrast ratios

### Import Organization

```typescript
// 1. External dependencies (React, Vue, etc.)
import { Component } from "svelte";
import { fade, scale } from "svelte/transition";

// 2. Internal dependencies (@neobr/*)
import { cn } from "$lib/utils";
import { Button } from "$lib/components/ui/button";

// 3. Type imports
import type { Props } from "./types";
```

### Component Structure (Svelte 5)

```svelte
<script lang="ts">
  // 1. Type imports
  import type { ComponentProps } from 'svelte';

  // 2. Component imports
  import { cn } from '$lib/utils';

  // 3. Props definition
  type Props = {
    variant?: 'primary' | 'secondary' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  // 4. Props destructuring
  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    ...rest
  }: Props = $props();

  // 5. Local state
  let visible = $state(false);
</script>

<!-- 6. Template -->
<div class="{cn('base-class', className)}">
  {@render children?.()}
</div>
```

### Styling Guidelines

- Use `cn()` utility for class merging
- Apply brutalist design principles: `shadow-bruntalist`, `rounded-none`, `tracking-brutalist`
- Use semantic color tokens: `bg-primary`, `text-fg-light`, etc.
- No inline styles - use Tailwind classes only
- Mechanical precision in typography and layout

### TypeScript Guidelines

- Strict mode enabled
- Use proper type definitions for all props
- Generic types for component props
- Avoid `any` types - use proper interfaces
- Use `$props()` for Svelte 5 component props

### Naming Conventions

- **Components**: PascalCase (Button, Card, Modal)
- **Props**: camelCase (variant, size, disabled)
- **Files**: kebab-case for utilities (class-variance.ts), PascalCase for components (Button.svelte)
- **Variables**: camelCase (isVisible, isLoading)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL)

### Error Handling

- Use proper error boundaries in Svelte components
- Validate props with TypeScript types
- Provide meaningful error messages
- Handle loading and error states gracefully

### Testing Guidelines

- Use Vitest for unit testing
- Use @testing-library/svelte for component testing
- Test accessibility with vitest-axe
- Test all component props and variants
- Test brutalist styling consistency

### Accessibility Requirements

- Minimum contrast ratio: 7:1 for normal text, 4.5:1 for large text
- Semantic HTML elements (button, a, label)
- ARIA attributes where necessary (aria-label, aria-expanded)
- Keyboard navigation support
- Focus management with visible focus rings

### Git Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `test:`, etc.
- Keep commits focused and atomic
- Write clear, descriptive commit messages

### Package Management

- Use pnpm workspaces
- Dependencies in root package.json for shared tooling
- Package-specific dependencies in individual package.json files
- Use workspace protocol for internal dependencies (`workspace:*`)

## Development Workflow

1. **Setup**: Run `pnpm install` to install all dependencies
2. **Development**: Use `pnpm --filter svelte dev` for component development
3. **Testing**: Run `pnpm --filter svelte test` for component tests
4. **Linting**: Use `pnpm --filter svelte lint` for code formatting
5. **Type Checking**: Use `pnpm --filter svelte check` for type validation
6. **Building**: Run `pnpm build` to build all packages

## Key Files and Directories

- `packages/svelte/`: Core Svelte component library
- `packages/tailwind-preset/`: Tailwind configuration and tokens
- `apps/docs/`: Documentation site (SvelteKit)
- `src/lib/`: Component source code
- `src/lib/utils.ts`: Utility functions (cn, etc.)
- `src/tests/`: Test setup and utilities
- `vitest.config.ts`: Test configuration
- `tsconfig.json`: TypeScript configuration

## Design Tokens

All visual values must come from design tokens defined in `packages/tailwind-preset/tokens.js`:

- **Colors**: `colors.bg.light`, `colors.fg.dark`, etc.
- **Spacing**: `spacing.md`, `spacing.brutalist`, etc.
- **Typography**: `typography.fontSize.md`, `typography.letterSpacing.brutalist`
- **Shadows**: `shadow.brutalist`, `shadow.impact`, etc.
- **Radius**: `radius.brutalist`, `radius.none`, etc.

## Brutalist Design Principles

- **Bold, high-contrast colors** with no gradients
- **Visible, thick borders** (2px-3px)
- **No rounded corners** (sharp edges)
- **Mechanical precision** in typography and layout
- **Structured and grid-based** layouts
- **High contrast ratios** for maximum readability

## Testing Requirements

- All components must have unit tests
- Test all props and variants
- Test accessibility compliance
- Test brutalist styling consistency
- Use @testing-library/svelte for DOM testing
- Use vitest-axe for accessibility testing

## Documentation

- Update documentation for new components
- Include brutalist design examples
- Document all props and variants
- Include accessibility guidelines
- Provide usage examples with tokens
