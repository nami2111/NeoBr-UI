# NeoBr-UI Agent Guidelines

High-performance, accessible Neo-Brutalist component library built with **Svelte 5** and **Tailwind CSS**.

## Project Structure

```
neobr-ui/
├── packages/
│   ├── svelte/              # Core component library
│   │   ├── src/lib/
│   │   │   ├── components/  # UI components
│   │   │   ├── variants/    # CVA variant definitions
│   │   │   └── utils/       # Utility functions
│   │   └── package.json
│   └── tailwind-preset/     # Design tokens & config
├── apps/
│   └── docs/                # SvelteKit documentation
└── package.json
```

## Build Commands

### Root Level
```bash
pnpm install              # Install all dependencies
pnpm build               # Build all packages
pnpm test                # Test all packages
pnpm lint                # Lint all packages
pnpm format              # Format all files
```

### Package Level (@neobr/svelte)
```bash
svelte-package           # Build the package
vite dev                 # Development server
svelte-check             # Type checking
svelte-check --watch     # Watch mode type checking
vitest run               # Run tests once
vitest                   # Watch mode tests
prettier --write .       # Format code
```

### Documentation
```bash
pnpm --filter docs dev       # Dev server
pnpm --filter docs build     # Production build
pnpm --filter docs preview   # Preview build
pnpm --filter docs check     # Type checking
```

## Core Principles

1. **Token-first design** - All visual values from design tokens, zero hardcoded values
2. **Svelte 5 patterns** - Use runes (`$state`, `$derived`, `$effect`), snippets over slots
3. **CVA variants** - Type-safe component variants with class-variance-authority
4. **Accessibility first** - WCAG AAA compliance (7:1 contrast ratio minimum)
5. **Neo-Brutalism** - Thick borders, sharp corners, hard shadows, high contrast, no gradients

## Component Structure Pattern

```svelte
<script lang="ts">
  // 1. Svelte imports
  import { fade } from 'svelte/transition'
  
  // 2. External dependencies
  import { cva, type VariantProps } from 'class-variance-authority'
  
  // 3. Internal utilities
  import { cn } from '$lib/utils'
  
  // 4. Type imports
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  
  // 5. Variant definition (or import from variants/)
  const buttonVariants = cva(
    'inline-flex items-center justify-center border-brutalist shadow-brutalist',
    {
      variants: {
        variant: {
          primary: 'bg-primary text-fg-light hover:bg-primary-hover',
          secondary: 'bg-secondary text-fg-dark hover:bg-secondary-hover',
        },
        size: {
          sm: 'h-9 px-brutalist-sm',
          md: 'h-11 px-brutalist-md',
        },
      },
      defaultVariants: { variant: 'primary', size: 'md' },
    }
  )
  
  type ButtonVariant = VariantProps<typeof buttonVariants>
  
  // 6. Props type definition
  type Props = ButtonVariant & {
    class?: string
    disabled?: boolean
    children?: Snippet
    onclick?: (e: MouseEvent) => void
  } & Omit<HTMLButtonAttributes, 'class'>
  
  // 7. Props destructuring with defaults
  let {
    variant = 'primary',
    size = 'md',
    class: className,
    disabled = false,
    children,
    onclick,
    ...restProps
  }: Props = $props()
  
  // 8. Local state (if needed)
  let isPressed = $state(false)
  
  // 9. Derived values
  let computedClasses = $derived(
    cn(buttonVariants({ variant, size }), className)
  )
</script>

<button
  type="button"
  {disabled}
  class={computedClasses}
  onclick={onclick}
  {...restProps}
>
  {@render children?.()}
</button>
```

## CVA Variant Patterns

### Basic Variants File
```typescript
// lib/variants/button.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base classes - always applied
  'inline-flex items-center justify-center font-brutalist tracking-brutalist border-brutalist transition-brutalist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-fg-light border-fg-dark hover:bg-primary-hover shadow-brutalist',
        secondary: 'bg-secondary text-fg-dark border-fg-dark hover:bg-secondary-hover shadow-brutalist',
        destructive: 'bg-destructive text-fg-light border-fg-dark hover:bg-destructive-hover shadow-brutalist',
        outline: 'bg-transparent border-2 border-fg-dark text-fg-dark hover:bg-bg-light',
        ghost: 'border-none hover:bg-bg-light text-fg-dark',
      },
      size: {
        sm: 'h-9 px-brutalist-sm text-sm',
        md: 'h-11 px-brutalist-md text-base',
        lg: 'h-13 px-brutalist-lg text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariant = VariantProps<typeof buttonVariants>
```

## Svelte 5 Runes Guide

### $state - Reactive State
```typescript
// Simple values
let count = $state(0)
let name = $state('')

// Objects (mutations are reactive)
let user = $state({ name: 'John', age: 30 })
user.age++ // This is reactive

// Arrays (mutations are reactive)
let items = $state<string[]>([])
items.push('new item') // This is reactive
```

### $derived - Computed Values
```typescript
let count = $state(0)

// Simple derived
let doubled = $derived(count * 2)

// Complex derived with .by()
let status = $derived.by(() => {
  if (count < 10) return 'low'
  if (count < 50) return 'medium'
  return 'high'
})

// Multiple dependencies
let price = $state(100)
let quantity = $state(2)
let total = $derived(price * quantity)
```

### $effect - Side Effects
```typescript
let name = $state('')

// Basic effect
$effect(() => {
  console.log('Name changed:', name)
})

// Effect with cleanup
$effect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  
  return () => {
    clearInterval(timer)
  }
})
```

### $bindable - Two-way Binding
```typescript
// In child component
type Props = {
  value?: string
}

let { value = $bindable('') }: Props = $props()

// In parent component
let text = $state('')
<Input bind:value={text} />
```

## Snippet Pattern (Replaces Slots)

### Basic Snippets
```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'
  
  type Props = {
    children?: Snippet
    header?: Snippet
    footer?: Snippet
  }
  
  let { children, header, footer }: Props = $props()
</script>

<div class="card">
  {#if header}
    <div class="card-header">
      {@render header()}
    </div>
  {/if}
  
  {#if children}
    <div class="card-content">
      {@render children()}
    </div>
  {/if}
  
  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</div>

<!-- Usage -->
<Card>
  {#snippet header()}
    <h2>Card Title</h2>
  {/snippet}
  
  {#snippet children()}
    <p>Card content goes here</p>
  {/snippet}
  
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

### Snippets with Parameters
```svelte
<script lang="ts">
  type Props = {
    items: Array<{ id: string; name: string }>
    itemSnippet?: Snippet<[{ id: string; name: string }]>
  }
  
  let { items, itemSnippet }: Props = $props()
</script>

<ul>
  {#each items as item}
    <li>
      {@render itemSnippet?.(item)}
    </li>
  {/each}
</ul>

<!-- Usage -->
<List {items}>
  {#snippet itemSnippet(item)}
    <strong>{item.name}</strong>
  {/snippet}
</List>
```

## Design Tokens Reference

### Color Tokens
```css
/* Background */
bg-light, bg-dark, bg-muted

/* Foreground */
fg-light, fg-dark, fg-muted

/* Semantic */
primary, secondary, destructive, warning, success
primary-hover, secondary-hover, destructive-hover

/* Component-specific */
border, ring, input
```

### Spacing Tokens
```css
/* Brutalist spacing */
px-brutalist-sm   /* 12px */
px-brutalist-md   /* 20px */
px-brutalist-lg   /* 32px */

/* Standard spacing */
p-sm, p-md, p-lg, p-xl
m-sm, m-md, m-lg, m-xl
gap-sm, gap-md, gap-lg
```

### Typography Tokens
```css
/* Font families */
font-brutalist    /* Space Grotesk */
font-body         /* Inter */

/* Sizes */
text-sm, text-base, text-lg, text-xl, text-2xl

/* Letter spacing */
tracking-brutalist, tracking-tight, tracking-normal
```

### Effect Tokens
```css
/* Borders */
border-brutalist  /* 3px */
border-thin       /* 1px */
border-2          /* 2px */

/* Shadows */
shadow-brutalist  /* 4px 4px 0 0 #000 */
shadow-impact     /* 8px 8px 0 0 #000 */
shadow-none

/* Border radius */
rounded-none      /* 0 - brutalist style */
rounded-sm        /* 2px - subtle */

/* Transitions */
transition-brutalist
duration-brutalist
```

## Brutalist Design Checklist

When creating components, ensure:

- [ ] **No hardcoded values** - All values from design tokens
- [ ] **Thick borders** - Use `border-brutalist` (3px) or `border-2` (2px)
- [ ] **Sharp corners** - Always use `rounded-none`
- [ ] **Hard shadows** - Use `shadow-brutalist` or `shadow-impact`
- [ ] **High contrast** - Minimum 7:1 ratio for text
- [ ] **Bold colors** - Solid fills only, no gradients
- [ ] **Wide spacing** - Use `tracking-brutalist` for headings
- [ ] **Grid layouts** - Structured, aligned elements
- [ ] **Mechanical precision** - Consistent spacing and alignment

## Accessibility Requirements

### Required Attributes
```svelte
<!-- Buttons -->
<button
  type="button"
  aria-label="Close dialog"
  disabled={isDisabled}
>
  Close
</button>

<!-- Interactive elements -->
<div
  role="button"
  tabindex="0"
  aria-pressed={isPressed}
  onkeydown={handleKeydown}
>
  Toggle
</div>

<!-- Form fields -->
<input
  id={fieldId}
  aria-describedby={descriptionId}
  aria-invalid={!!error}
  aria-required={required}
/>
```

### Keyboard Navigation
```typescript
function handleKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault()
      handleActivate()
      break
    case 'Escape':
      handleClose()
      break
    case 'ArrowDown':
      e.preventDefault()
      focusNext()
      break
    case 'ArrowUp':
      e.preventDefault()
      focusPrevious()
      break
  }
}
```

### Focus Management
```svelte
<script lang="ts">
  let dialogElement: HTMLElement | undefined = $state()
  let open = $state(false)
  let previousFocus: Element | null = null
  
  $effect(() => {
    if (open && dialogElement) {
      previousFocus = document.activeElement
      dialogElement.focus()
    } else if (!open && previousFocus instanceof HTMLElement) {
      previousFocus.focus()
    }
  })
</script>
```

## Testing Guidelines

### Component Test Structure
```typescript
import { render, screen } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import Button from './Button.svelte'

describe('Button', () => {
  it('renders with default props', () => {
    render(Button, { props: { children: 'Click me' } })
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
  
  it('applies variant styles correctly', () => {
    render(Button, { props: { variant: 'primary' } })
    expect(screen.getByRole('button')).toHaveClass('bg-primary')
  })
  
  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    
    render(Button, { 
      props: { 
        onclick: () => { clicked = true }
      } 
    })
    
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })
  
  it('respects disabled state', async () => {
    const user = userEvent.setup()
    let clicked = false
    
    render(Button, { 
      props: { 
        disabled: true,
        onclick: () => { clicked = true }
      } 
    })
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
    await user.click(button)
    expect(clicked).toBe(false)
  })
  
  it('meets WCAG AAA accessibility standards', async () => {
    const { container } = render(Button, { 
      props: { children: 'Click' } 
    })
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('applies brutalist design tokens', () => {
    render(Button, { props: { variant: 'primary' } })
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('border-brutalist')
    expect(button).toHaveClass('shadow-brutalist')
  })
})
```

### Test Coverage Requirements
- ✅ All variants and sizes
- ✅ All event handlers
- ✅ Disabled/loading/error states
- ✅ Accessibility (WCAG AAA)
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Brutalist styling consistency

## Naming Conventions

- **Components**: PascalCase (`Button.svelte`, `Card.svelte`, `DialogModal.svelte`)
- **Props**: camelCase (`variant`, `size`, `isDisabled`, `onClick`)
- **Files**: 
  - Components: PascalCase (`Button.svelte`)
  - Utilities: kebab-case (`class-variance.ts`, `token-utils.ts`)
  - Variants: kebab-case (`button-variants.ts`)
- **Variables**: camelCase (`isVisible`, `currentUser`, `itemCount`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_ITEMS`)

## Git Commit Conventions

```bash
# Format: <type>(<scope>): <subject>

# Types
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Code formatting
refactor: # Code refactoring
test:     # Tests
chore:    # Maintenance

# Examples
feat(button): add brutalist shadow variant
fix(card): correct border thickness token
docs(readme): update installation guide
test(input): add keyboard navigation tests
refactor(utils): simplify cn function
```

## Common Utilities

### cn() - Class Name Merging
```typescript
import { cn } from '$lib/utils'

// Basic usage
cn('base-class', 'additional-class')

// With conditionals
cn('base-class', isActive && 'active-class', className)

// With arrays
cn(['class-1', 'class-2'], className)

// Complex merging
cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  size === 'large' && 'large-class',
  disabled && 'disabled-class',
  className
)
```

## Quick Reference

### Svelte 4 → Svelte 5 Migration

| Pattern | Svelte 4 | Svelte 5 |
|---------|----------|----------|
| Props | `export let prop` | `let { prop } = $props()` |
| Computed | `$: computed = value * 2` | `let computed = $derived(value * 2)` |
| Effects | `$: { sideEffect() }` | `$effect(() => { sideEffect() })` |
| Slots | `<slot />` | `{@render children?.()}` |
| Named slots | `<slot name="header" />` | `{@render header?.()}` |
| Binding | `bind:value` | `bind:value` or `$bindable()` |

## Resources

- **Svelte 5**: https://svelte-5-preview.vercel.app/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **CVA**: https://cva.style/docs
- **Testing Library**: https://testing-library.com/svelte
- **Vitest**: https://vitest.dev/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/
