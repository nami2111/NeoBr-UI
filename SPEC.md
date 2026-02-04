# NeoBr-UI Framework Spec — Svelte + Tailwind Preset (Neo Brutalism Edition)

## Overview

This project defines a **modern, reusable UI framework** for Svelte projects using a **Tailwind-style preset** approach with a **Clean Neo Brutalism** design style. The goal is to enable fast project bootstrapping with consistent UI/UX across multiple products, while remaining lightweight, customizable, and framework-native to Svelte.

**Clean Neo Brutalism?**
We aim for the bold, high-contrast, and "raw" aesthetic of Neo Brutalism, but without the intentional ugliness or chaos. Think "organized chaos" or "precision brutalism". Bold borders, vibrant colors, but perfect alignment and usability.

**Key Differentiators:**n- **Neo Brutalism aesthetic** with bold colors and raw design elements

- **HugeIcons integration** for consistent iconography
- **Automatic dark mode** based on system preference
- **Vitest testing** for robust component validation
- **npm publish ready** for public distribution
- **Brutalist color palette** for maximum visual impact

The framework consists of:

- Design Tokens (single source of truth)
- Tailwind Preset (theme + utilities)
- Reusable Svelte Components with HugeIcons
- Comprehensive documentation and testing

---

## Goals

- Reusable across multiple Svelte / SvelteKit projects with Neo Brutalism aesthetic
- Consistent visual identity with bold, raw design elements
- Opinionated defaults with flexibility via props and tokens
- Easy to maintain and rebrand by changing tokens only
- Friendly for AI-assisted coding workflows
- Production-ready with comprehensive testing
- npm publishable with proper versioning
- Stand out with distinctive Neo Brutalist design

---

## Design Principles (Neo Brutalism Edition)

### 1. Token-First Design

All visual values **must come from design tokens**. Hardcoded values (colors, spacing, radius) are not allowed inside components.

### 2. Clean Neo Brutalism

- **Bold, high-contrast colors** with no gradients
- **Visible, thick borders** (2px-3px)
- **System fonts** or precision monospaced fonts
- **No rounded corners** (sharp edges)
- **Structured and Grid-based**
- **Avoid:** Intentional misalignment, overlapping text that hurts readability, or excessive visual noise.

### 3. Functional Over Decorative

- **No unnecessary animations** or transitions
- **Direct, honest design** that shows structure
- **High contrast** for maximum readability
- **Mechanical precision** in typography and layout

### 4. Accessibility by Default

- Semantic HTML with brutalist honesty
- High contrast ratios (minimum 7:1)
- Focus-visible styles with bold outlines
- Keyboard interaction supported
- ARIA attributes where necessary

### 5. Testing-Driven Development

- Components must have unit tests
- Visual regression testing for brutalist consistency
- Accessibility testing for contrast compliance
- Performance considerations for raw design

### 6. npm-Ready Architecture

- Proper package.json configuration
- ESM exports
- TypeScript definitions
- Semantic versioning

---

## Design Tokens (Neo Brutalism Edition)

### Token Categories

Defined in `packages/tailwind-preset/tokens.js`

```js
export const colors = {
  // Background colors (brutalist palette)
  bg: {
    light: '#fafafa',     // Raw White - pure, unfiltered
    dark: '#2c2c2c',      // Grayscale Base - mechanical gray
    accent: '#00ffff',     // Bold Cyan - digital neon
    warning: '#ff0033',    // Sharp Red - urgent, raw
    muted: '#ffb3b3',      // Muted Pink - vintage warmth
    success: '#bfff00',    // Lime Punch - digital green
  },
  
  // Foreground colors
  fg: {
    light: '#000000',     // Pure Black - absolute contrast
    dark: '#ffffff',      // Raw White - maximum brightness
    accent: '#00ffff',     // Bold Cyan - digital neon
    warning: '#ff0033',    // Sharp Red - urgent, raw
    muted: '#ffb3b3',      // Muted Pink - vintage warmth
    success: '#bfff00',    // Lime Punch - digital green
  },
  
  // Semantic colors (brutalist variants)
  primary: {
    base: '#00ffff',      // Bold Cyan - digital neon
    hover: '#00cccc',     // Darker Cyan - mechanical depth
    active: '#00a3a3',    // Deep Cyan - raw intensity
  },
  secondary: {
    base: '#ffb3b3',      // Muted Pink - vintage warmth
    hover: '#ff9999',     // Brighter Pink - mechanical glow
    active: '#ff8080',    // Deep Pink - raw intensity
  },
  destructive: {
    base: '#ff0033',      // Sharp Red - urgent, raw
    hover: '#cc0029',     // Darker Red - mechanical depth
    active: '#990020',    // Deep Red - raw intensity
  },
  neutral: {
    base: '#2c2c2c',      // Grayscale Base - mechanical gray
    hover: '#1a1a1a',     // Darker Gray - mechanical depth
    active: '#0d0d0d',    // Deep Gray - raw intensity
  }
}

export const typography = {
  fontFamily: {
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'], // Mechanical precision
    sans: ['Inter', 'system-ui', 'sans-serif']          // System fonts
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem',
    display: '3rem', // Brutalist display typography
    hero: '4.5rem'   // Maximum impact
  },
  lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
  letterSpacing: {
    tight: '-0.025em', normal: '0em', wide: '0.025em',
    brutalist: '0.1em', // Mechanical tracking for impact
    uppercase: '0.2em'  // Maximum mechanical precision
  }
}

export const spacing = {
  xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem',
  brutalist: '0.75rem', // Mechanical spacing for structure
  impact: '3rem'        // Maximum spacing for impact
}

export const radius = {
  none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem',
  brutalist: '0.75rem'  // Minimal rounding for raw edges
}

export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  brutalist: '5px 5px 0px 0px rgba(0,0,0,1)', // Mechanical offset
  impact: '10px 10px 0px 0px rgba(0,0,0,1)',  // Maximum impact
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
}

export const zIndex = { 
  dropdown: 1000, modal: 1050, toast: 1100, tooltip: 1200,
  brutalist: 2000  // Maximum z-index for brutalist overlays
}

export const duration = { fast: '150ms', normal: '300ms', slow: '500ms' }
export const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
```

### Neo Brutalist Color Palette

**Background Colors:**

- `bg.light`: `#fafafa` (Raw White - pure, unfiltered)
- `bg.dark`: `#2c2c2c` (Grayscale Base - mechanical gray)
- `bg.accent`: `#00ffff` (Bold Cyan - digital neon)
- `bg.warning`: `#ff0033` (Sharp Red - urgent, raw)
- `bg.muted`: `#ffb3b3` (Muted Pink - vintage warmth)
- `bg.success`: `#bfff00` (Lime Punch - digital green)

**Foreground Colors:**

- `fg.light`: `#000000` (Pure Black - absolute contrast)
- `fg.dark`: `#ffffff` (Raw White - maximum brightness)
- `fg.accent`: `#00ffff` (Bold Cyan - digital neon)
- `fg.warning`: `#ff0033` (Sharp Red - urgent, raw)
- `fg.muted`: `#ffb3b3` (Muted Pink - vintage warmth)
- `fg.success`: `#bfff00` (Lime Punch - digital green)

**Semantic Colors:**

- `primary`: Blue-based for actions (Bold Cyan)
- `secondary`: Pink-based for secondary elements (Muted Pink)
- `destructive`: Red-based for errors/danger (Sharp Red)
- `neutral`: Gray-based for neutral elements (Grayscale Base)

---

## Tailwind Preset (Neo Brutalism Edition)

### Purpose

The Tailwind preset injects the UI framework's Neo Brutalist theme into consuming projects with automatic dark mode support and brutalist design principles.

### Requirements

- Export a valid Tailwind config object
- Extend (not replace) Tailwind defaults with brutalist overrides
- Import tokens dynamically
- Support automatic dark mode with brutalist colors
- Include HugeIcons configuration
- Apply brutalist design utilities

### Example

```js
export default {
  darkMode: ['class', '[data-theme]'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
      zIndex: tokens.zIndex,
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      // Brutalist utilities
      boxShadow: {
        'brutalist': '5px 5px 0px 0px rgba(0,0,0,1)',
        'impact': '10px 10px 0px 0px rgba(0,0,0,1)',
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)'
      },
      borderRadius: {
        'brutalist': '0.75rem',
        'none': '0'
      },
      letterSpacing: {
        'brutalist': '0.1em',
        'uppercase': '0.2em'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')(),
    require('tailwindcss-hugeicons')(),
    require('tailwindcss-neobrutalism')() // Brutalist plugin
  ]
}
```

---

## Svelte Components (Neo Brutalism Edition)

### General Rules

- One component per file
- No inline styles (use tokens only)
- Props typed with TypeScript
- Slot-first API when possible
- HugeIcons integration
- Comprehensive testing
- Brutalist design principles applied

---

### Button

**Props**

- `variant`: `primary | secondary | destructive | outline | link` (default: `primary`)
- `size`: `sm | md | lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `loading`: boolean (default: `false`)
- `icon`: string (optional, HugeIcons name)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-primary text-primary-foreground hover:bg-primary/90 brutalist`
- **Mechanical shadows**: `shadow-bruntalist` with offset
- **No rounded corners**: `rounded-none` by default
- **Bold typography**: `font-bold tracking-brutalist`
- **High contrast**: `text-fg-light bg-bg-dark`
- **Loading state**: `spinner` with brutalist colors

**Brutalist Examples:**

```svelte
<!-- Primary button (Neo Brutalist) -->
<Button variant="primary">Action</Button>
<!-- Renders as: -->
<button class="bg-[#00ffff] text-[#000000] hover:bg-[#00cccc] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">
  Action
</button>

<!-- Secondary button (Neo Brutalist) -->
<Button variant="secondary">Secondary</Button>
<!-- Renders as: -->
<button class="bg-[#ffb3b3] text-[#2c2c2c] hover:bg-[#ff9999] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">
  Secondary
</button>

<!-- Destructive button (Neo Brutalist) -->
<Button variant="destructive">Delete</Button>
<!-- Renders as: -->
<button class="bg-[#ff0033] text-[#fafafa] hover:bg-[#cc0029] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">
  Delete
</button>
```

---

### Input

**Props**

- `value`: string (default: `''`)
- `placeholder`: string (default: `''`)
- `disabled`: boolean (default: `false`)
- `error`: string | boolean (default: `false`)
- `icon`: string (optional, HugeIcons name)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-bg-light text-fg-dark border-2 border-fg-light brutalist`
- **Mechanical shadows**: `shadow-inner` for depth
- **No rounded corners**: `rounded-none`
- **Bold typography**: `font-mono tracking-normal`
- **Error state**: `border-destructive bg-warning`
- **Focus state**: `outline-2 outline-primary`

**Brutalist Examples:**

```svelte
<!-- Text input (Neo Brutalist) -->
<Input placeholder="Enter text" />
<!-- Renders as: -->
<input class="bg-[#fafafa] text-[#000000] border-2 border-[#fafafa] font-mono tracking-normal shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] rounded-none px-3 py-2 focus:outline-2 focus:outline-[#00ffff] focus:border-transparent" placeholder="Enter text">

<!-- Error input (Neo Brutalist) -->
<Input error="Invalid input" />
<!-- Renders as: -->
<input class="bg-[#ffb3b3] text-[#2c2c2c] border-2 border-[#ff0033] font-mono tracking-normal shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] rounded-none px-3 py-2 focus:outline-2 focus:outline-[#00ffff] focus:border-transparent" placeholder="Invalid input">
```

---

### Card

**Props**

- `padding`: `sm | md | lg` (default: `md`)
- `variant`: `default | outlined | elevated` (default: `default`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-bg-light border-2 border-fg-light brutalist`
- **Mechanical shadows**: `shadow-bruntalist` for depth
- **No rounded corners**: `rounded-none`
- **Bold typography**: `font-mono tracking-normal`
- **Outlined variant**: `border-2 border-fg-dark`
- **Elevated variant**: `shadow-impact`

**Brutalist Examples:**

```svelte
<!-- Default card (Neo Brutalist) -->
<Card>
  <h3 class="text-lg font-bold tracking-brutalist mb-2">Card Title</h3>
  <p class="text-sm">Card content with brutalist styling</p>
</Card>
<!-- Renders as: -->
<div class="bg-[#fafafa] border-2 border-[#000000] font-mono tracking-normal shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none p-4">
  <h3 class="text-lg font-bold tracking-[0.1em] mb-2">Card Title</h3>
  <p class="text-sm">Card content with brutalist styling</p>
</div>

<!-- Outlined card (Neo Brutalist) -->
<Card variant="outlined">
  <h3 class="text-lg font-bold tracking-brutalist mb-2">Outlined Card</h3>
  <p class="text-sm">Card with bold borders</p>
</Card>
<!-- Renders as: -->
<div class="bg-transparent border-2 border-[#2c2c2c] font-mono tracking-normal rounded-none p-4">
  <h3 class="text-lg font-bold tracking-[0.1em] mb-2">Outlined Card</h3>
  <p class="text-sm">Card with bold borders</p>
</div>
```

---

### Badge

**Props**

- `variant`: `default | primary | secondary | destructive | success | warning` (default: `default`)
- `size`: `sm | md | lg` (default: `md`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-variant text-fg-light font-bold brutalist`
- **Mechanical shadows**: `shadow-sm` for depth
- **No rounded corners**: `rounded-none`
- **Bold typography**: `font-bold tracking-brutalist`
- **High contrast**: `text-fg-light bg-variant`

**Brutalist Examples:**

```svelte
<!-- Primary badge (Neo Brutalist) -->
<Badge variant="primary">New</Badge>
<!-- Renders as: -->
<span class="bg-[#00ffff] text-[#000000] font-bold tracking-[0.1em] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-none px-2.5 py-0.5 text-xs">New</span>

<!-- Destructive badge (Neo Brutalist) -->
<Badge variant="destructive">Error</Badge>
<!-- Renders as: -->
<span class="bg-[#ff0033] text-[#fafafa] font-bold tracking-[0.1em] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-none px-2.5 py-0.5 text-xs">Error</span>
```

---

### Modal

**Props**

- `open`: boolean (default: `false`)
- `closeOnBackdrop`: boolean (default: `true`)
- `closeOnEscape`: boolean (default: `true`)
- `size`: `sm | md | lg` (default: `md`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-bg-dark text-fg-light brutalist`
- **Mechanical shadows**: `shadow-impact` for maximum depth
- **No rounded corners**: `rounded-none`
- **Bold typography**: `font-mono tracking-normal`
- **Focus trap**: `focus:outline-2 focus:outline-primary`
- **Backdrop**: `bg-black/50`

**Brutalist Examples:**

```svelte
<!-- Modal (Neo Brutalist) -->
<Modal open={isOpen}>
  <h2 class="text-xl font-bold tracking-brutalist mb-4">Modal Title</h2>
  <p class="mb-4">Modal content with brutalist styling</p>
  <Button variant="primary">Confirm</Button>
</Modal>
<!-- Renders as: -->
<div class="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
  <div class="bg-[#2c2c2c] text-[#ffffff] font-mono tracking-normal shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-none p-6 max-w-md w-full">
    <h2 class="text-xl font-bold tracking-[0.1em] mb-4">Modal Title</h2>
    <p class="mb-4">Modal content with brutalist styling</p>
    <button class="bg-[#00ffff] text-[#000000] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">Confirm</button>
  </div>
</div>
```

---

### Link

**Props**

- `href`: string (required)
- `variant`: `default | primary | muted | destructive` (default: `default`)
- `disabled`: boolean (default: `false`)
- `external`: boolean (default: `false`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `text-variant hover:text-variant/80 brutalist`
- **No text decoration**: `underline-offset-4 hover:underline`
- **Bold typography**: `font-bold tracking-brutalist`
- **External indicators**: `text-xs text-muted`
- **High contrast**: `text-fg-light bg-transparent`

**Brutalist Examples:**

```svelte
<!-- Primary link (Neo Brutalist) -->
<Link href="/" variant="primary">Home</Link>
<!-- Renders as: -->
<a href="/" class="text-[#00ffff] font-bold tracking-[0.1em] underline-offset-4 hover:underline hover:text-[#00cccc]">Home</a>

<!-- External link (Neo Brutalist) -->
<Link href="https://example.com" external variant="muted">External</Link>
<!-- Renders as: -->
<a href="https://example.com" class="text-[#ffb3b3] font-bold tracking-[0.1em] underline-offset-4 hover:underline hover:text-[#ff9999] text-xs">External</a>
```

---

### Icon

**Props**

- `name`: string (required, HugeIcons name)
- `size`: `sm | md | lg | xl` (default: `md`)
- `color`: string (optional, color token)
- `spin`: boolean (default: `false`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `text-variant brutalist`
- **Mechanical precision**: `font-mono tracking-normal`
- **High contrast**: `text-fg-light bg-transparent`
- **Spin animation**: `animate-spin` with brutalist timing
- **HugeIcons integration**: Proper icon rendering

**Brutalist Examples:**

```svelte
<!-- Primary icon (Neo Brutalist) -->
<Icon name="check" size="lg" color="primary" />
<!-- Renders as: -->
<svg class="text-[#00ffff] h-6 w-6 animate-spin" role="img" aria-label="check icon">
  <!-- HugeIcons SVG content -->
</svg>

<!-- Warning icon (Neo Brutalist) -->
<Icon name="warning" size="md" color="warning" />
<!-- Renders as: -->
<svg class="text-[#ff0033] h-4 w-4" role="img" aria-label="warning icon">
  <!-- HugeIcons SVG content -->
</svg>
```

---

### Loading

**Props**

- `size`: `sm | md | lg | xl` (default: `md`)
- `color`: string (optional, color token)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `text-variant brutalist`
- **Mechanical precision**: `font-mono tracking-normal`
- **High contrast**: `text-fg-light bg-transparent`
- **Spin animation**: `animate-spin` with brutalist timing
- **Skeleton states**: `bg-muted animate-pulse`

**Brutalist Examples:**

```svelte
<!-- Spinner (Neo Brutalist) -->
<Loading size="md" color="primary" />
<!-- Renders as: -->
<div class="text-[#00ffff] h-4 w-4 animate-spin">Loading...</div>

<!-- Skeleton (Neo Brutalist) -->
<Loading size="lg" as="skeleton" />
<!-- Renders as: -->
<div class="bg-[#ffb3b3] h-8 w-full animate-pulse rounded-none"></div>
```

---

### Alert

**Props**

- `variant`: `info | success | warning | error` (default: `info`)
- `closable`: boolean (default: `true`)
- `timeout`: number (default: `5000`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-variant text-fg-light brutalist`
- **Mechanical shadows**: `shadow-sm` for depth
- **No rounded corners**: `rounded-none`
- **Bold typography**: `font-bold tracking-brutalist`
- **Auto-dismiss**: `transition-opacity duration-300`
- **Close button**: `hover:text-destructive`

**Brutalist Examples:**

```svelte
<!-- Success alert (Neo Brutalist) -->
<Alert variant="success" closable timeout={3000}>
  Operation completed successfully!
</Alert>
<!-- Renders as: -->
<div class="bg-[#bfff00] text-[#2c2c2c] font-bold tracking-[0.1em] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-none p-4 flex items-center justify-between">
  <span>Operation completed successfully!</span>
  <button class="ml-2 text-[#ff0033] hover:text-[#cc0029]">×</button>
</div>

<!-- Error alert (Neo Brutalist) -->
<Alert variant="error" closable>
  Something went wrong. Please try again.
</Alert>
<!-- Renders as: -->
<div class="bg-[#ff0033] text-[#fafafa] font-bold tracking-[0.1em] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-none p-4 flex items-center justify-between">
  <span>Something went wrong. Please try again.</span>
  <button class="ml-2 text-[#fafafa] hover:text-[#ffb3b3]">×</button>
</div>
```

---

### Dropdown

**Props**

- `open`: boolean (default: `false`)
- `trigger`: slot (required)
- `position`: `top | bottom | left | right` (default: `bottom`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-bg-dark text-fg-light brutalist`
- **Mechanical shadows**: `shadow-impact` for depth
- **No rounded corners**: `rounded-none`
- **Focus trap**: `focus:outline-2 focus:outline-primary`
- **Keyboard navigation**: `tabindex="0"`
- **Proper z-index**: `z-[2000]`

**Brutalist Examples:**

```svelte
<!-- Dropdown (Neo Brutalist) -->
<Dropdown open={isOpen}>
  <Button slot="trigger">Menu</Button>
  <ul class="bg-[#2c2c2c] text-[#ffffff] font-mono tracking-normal shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-none p-2">
    <li class="py-1"><a href="#" class="block px-3 hover:bg-[#00ffff]">Option 1</a></li>
    <li class="py-1"><a href="#" class="block px-3 hover:bg-[#00ffff]">Option 2</a></li>
  </ul>
</Dropdown>
<!-- Renders as: -->
<div class="relative">
  <button class="bg-[#00ffff] text-[#000000] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">Menu</button>
  <ul class="absolute top-full left-0 mt-2 bg-[#2c2c2c] text-[#ffffff] font-mono tracking-normal shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-none p-2 z-[2000]">
    <li class="py-1"><a href="#" class="block px-3 hover:bg-[#00ffff]">Option 1</a></li>
    <li class="py-1"><a href="#" class="block px-3 hover:bg-[#00ffff]">Option 2</a></li>
  </ul>
</div>
```

---

### Form

**Props**

- `onSubmit`: (data: Record<string, any>) => void (required)
- `disabled`: boolean (default: `false`)
- `brutalist`: boolean (default: `true`) - applies brutalist styling

**Behavior**

- **Brutalist styling**: `bg-bg-light text-fg-dark brutalist`
- **Mechanical precision**: `font-mono tracking-normal`
- **High contrast**: `text-fg-light bg-bg-dark`
- **Form validation**: `error` states with brutalist colors
- **Loading states**: `spinner` with brutalist colors
- **Accessibility**: `aria-label` and proper semantics

**Brutalist Examples:**

```svelte
<!-- Form (Neo Brutalist) -->
<Form onSubmit={handleSubmit}>
  <Input name="email" placeholder="Email" />
  <Input name="password" type="password" placeholder="Password" />
  <Button type="submit" variant="primary">Login</Button>
</Form>
<!-- Renders as: -->
<form class="bg-[#fafafa] text-[#000000] font-mono tracking-normal p-4">
  <input class="bg-[#fafafa] text-[#000000] border-2 border-[#fafafa] font-mono tracking-normal shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] rounded-none px-3 py-2 focus:outline-2 focus:outline-[#00ffff] focus:border-transparent" name="email" placeholder="Email">
  <input class="bg-[#fafafa] text-[#000000] border-2 border-[#fafafa] font-mono tracking-normal shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] rounded-none px-3 py-2 focus:outline-2 focus:outline-[#00ffff] focus:border-transparent" name="password" type="password" placeholder="Password">
  <button class="bg-[#00ffff] text-[#000000] font-bold tracking-[0.1em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2">Login</button>
</form>
```

---

## Accessibility Guidelines (Neo Brutalism Edition)

### High Contrast Requirements

- **Minimum contrast ratio**: 7:1 for normal text, 4.5:1 for large text
- **Brutalist colors**: All color combinations must meet WCAG AAA
- **Focus indicators**: `outline-2 outline-primary` with brutalist precision
- **Error states**: `border-destructive bg-warning` with clear indicators

### Semantic HTML with Brutalist Honesty

- **Button for actions**: `button` elements with brutalist styling
- **Link for navigation**: `a` elements with brutalist typography
- **Form elements with labels**: `label` elements with brutalist precision
- **Dialog for modals**: `div` with `role="dialog"` and brutalist styling

### Focus Management

- **Visible focus rings**: `focus:outline-2 focus:outline-primary`
- **Focus trap in modals**: Mechanical focus management
- **Keyboard navigation**: `tabindex="0"` with brutalist indicators
- **Skip links**: `skip-to-content` with brutalist styling

### ARIA Attributes

- **aria-label for icons**: `aria-label="icon description"`
- **aria-describedby for errors**: `aria-describedby="error-id"`
- **aria-expanded for dropdowns**: `aria-expanded="true/false"`
- **aria-modal for modals**: `aria-modal="true"`

---

## Testing Strategy (Neo Brutalism Edition)

### Test Types

- **Unit Tests**: Component logic and brutalist props
- **Component Tests**: DOM rendering and brutalist interactions
- **Accessibility Tests**: ARIA compliance and contrast ratios
- **Visual Regression**: Brutal consistency across components
- **Color Contrast Tests**: WCAG AAA compliance for brutalist palette

### Framework

- **Vitest**: Test runner and assertion library
- **@testing-library/svelte**: Component testing with brutalist selectors
- **@storybook/svelte**: Visual testing for brutalist components
- **axe-core**: Accessibility testing for brutalist compliance
- **chromatic**: Visual regression for brutalist consistency

### Test Coverage Requirements

- All components must have unit tests
- Critical user flows must be tested with brutalist styling
- Accessibility violations must be caught (contrast, ARIA)
- Visual changes must be documented (brutalist consistency)
- Color contrast must meet WCAG AAA for brutalist palette

---

## Monorepo Architecture

We use **pnpm workspaces** to manage the framework as a monorepo.

### Directory Structure

```
/
├── packages/
│   ├── tailwind-preset/  # @neobr/tailwind-preset
│   └── svelte/           # @neobr/svelte
├── apps/
│   └── docs/             # Documentation Site (SvelteKit)
├── package.json          # Root configuration
└── pnpm-workspace.yaml   # Workspace definition
```

### Root Package.json

```json
{
  "name": "neobr-ui-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "prettier": "^3.0.0",
    "turbo": "^1.10.0" 
  }
}
```

### @neobr/tailwind-preset

Located in `packages/tailwind-preset/package.json`

- **Goal**: Export the Tailwind config and tokens.
- **Exports**: `index.js` (preset), `tokens.js` (raw tokens).

### @neobr/svelte

Located in `packages/svelte/package.json`

- **Goal**: The Svelte component library.
- **Dependencies**: `@neobr/tailwind-preset`, `hugeicons-svelte`.

---

## Documentation

### Minimum Required Docs

- Installation guide with brutalist setup
- Tailwind preset usage with brutalist configuration
- Component usage examples with brutalist styling
- Accessibility guidelines for brutalist compliance
- Testing setup for brutalist components
- Design tokens guide for brutalist palette

### Optional Documentation

- Storybook (Svelte) with brutalist themes
- SvelteKit demo site with brutalist design
- API reference with brutalist examples
- Contribution guidelines for brutalist design
- Migration guide from standard to brutalist

---

## Breaking Changes (Neo Brutalism Edition)

### Visual Design Changes

- **Major**: Changes to brutalist color palette or typography system
- **Minor**: New brutalist components or token variants
- **Patch**: Bug fixes, documentation updates, minor brutalist improvements

### Component API Changes

- **Major**: Changes to brutalist component props or behavior
- **Minor**: New brutalist features or non-breaking token changes
- **Patch**: Bug fixes, documentation updates, minor brutalist improvements

### Token Structure Changes

- **Major**: Changes to brutalist token categories or naming
- **Minor**: New brutalist tokens or non-breaking token additions
- **Patch**: Bug fixes, documentation updates, minor brutalist improvements

---

## Success Criteria (Neo Brutalism Edition)

### Technical Metrics

- ✅ New Svelte project can be styled in <10 minutes with brutalist setup
- ✅ Rebranding requires only token changes (brutalist palette)
- ✅ Components feel consistent and intentional with brutalist design
- ✅ All components have comprehensive tests (brutalist compliance)
- ✅ npm package publishes successfully
- ✅ Automatic dark mode works seamlessly with brutalist colors
- ✅ HugeIcons integration is smooth with brutalist styling
- ✅ WCAG AAA contrast compliance for brutalist palette

### User Experience

- ✅ Developer onboarding <30 minutes with brutalist documentation
- ✅ Component customization <5 minutes with brutalist tokens
- ✅ Accessibility compliance AA level (AAA for brutalist palette)
- ✅ Performance <100ms component render with brutalist efficiency
- ✅ Distinctive Neo Brutalist design that stands out
- ✅ Raw, honest design that communicates functionality
- ✅ High contrast and readability for maximum impact

---

## Versioning

### Semantic Versioning (Neo Brutalism Edition)

- **Major**: Breaking visual changes, component API changes, brutalist redesign
- **Minor**: New components, new features, non-breaking token changes, brutalist additions
- **Patch**: Bug fixes, documentation updates, minor brutalist improvements

### Breaking Changes

- Visual design changes requiring brutalist redesign
- Component API changes breaking existing brutalist code
- Token structure changes affecting brutalist theming
- Contrast ratio changes affecting brutalist accessibility

---

## Security Considerations

### Package Security

- Regular dependency updates for brutalist dependencies
- Security scanning in CI for brutalist components
- Minimal external dependencies for brutalist efficiency
- Code signing for brutalist releases

### Component Security

- Sanitize user inputs in brutalist components
- Prevent XSS vulnerabilities in brutalist rendering
- Content Security Policy headers for brutalist styling
- Secure cookie handling in brutalist forms

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests for Neo Brutalism design.

---

## Acknowledgments

- Tailwind CSS team for the excellent utility framework
- Svelte team for the reactive framework
- HugeIcons for the beautiful icon set
- Open source community for inspiration and support
- Neo Brutalism movement for bold design inspiration

---

**Last Updated**: 2026-02-04
**Version**: 1.0.0 (Neo Brutalism Edition)
**Design Philosophy**: Raw, bold, and unapologetically brutalist
