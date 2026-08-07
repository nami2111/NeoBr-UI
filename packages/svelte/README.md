# @neobr/svelte

A Svelte 5 Neo-Brutalist component library.

## Installation

```bash
pnpm add @neobr/svelte
```

### Setup

Import the design system in your global CSS:

```css
@import "tailwindcss";
@import "@neobr/svelte/style";
```

## Sub-path Exports

For better tree-shaking and faster build times, use granular sub-path exports:

```svelte
<script>
    import { Button } from "@neobr/svelte/button";
    import { Input } from "@neobr/svelte/input";
</script>
```

## Usage

NeoBr-UI uses Svelte 5 Runes for reactivity and Snippets for flexible composition.

```svelte
<script>
    import { Button, Card, CardHeader, CardTitle, CardContent } from "@neobr/svelte";
</script>

<Card>
    <CardHeader>
        <CardTitle>Hello Brutalism</CardTitle>
    </CardHeader>
    <CardContent>
        <Button onclick={() => console.log("Brutal!")}>Click Me</Button>
    </CardContent>
</Card>
```

## Migrating to v2

Version 2 standardizes bordered components around the shared `radius` prop. Replace removed
`brutalist` boolean props with one of the supported radius values:

```svelte
<Badge radius="brutalist">Sharp</Badge>
<Button radius="soft">Soft</Button>
<Input radius="rounded" />
```

`Popover` no longer wraps the trigger snippet in an internal button. Accept and spread the
provided trigger props onto your trigger element:

```svelte
<Popover>
    {#snippet trigger(props)}
        <Button {...props}>Open Popover</Button>
    {/snippet}

    Popover content
</Popover>
```

## Form Validation (Zod)

NeoBr-UI provides built-in integration with Zod for type-safe form validation using Svelte 5 runes.
String fields default to `""` for input binding. Provide `initialValues` for number, boolean, array, object, and date fields. Nested validation errors are reported on the top-level field key.

```svelte
<script>
    import { createFormState, z } from "@neobr/svelte/form";
    import { FormItem, FormLabel, FormMessage, Input, Button } from "@neobr/svelte";

    const schema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Too short"),
    });

    const form = createFormState({
        schema,
        onSubmit: async (values) => {
            console.log("Form data:", values);
        },
    });
</script>

<form onsubmit={form.handleSubmit}>
    <FormItem error={form.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
            type="email"
            bind:value={form.values.email}
            onblur={() => form.handleBlur("email")}
        />
        {#if form.errors.email}
            <FormMessage>{form.errors.email}</FormMessage>
        {/if}
    </FormItem>

    <Button type="submit" disabled={form.isSubmitting}>Sign In</Button>
</form>
```

## Available Components

- **General**: Button, Icon, Link, Badge, Alert, Loading, Sticker, Marquee
- **Layout**: Card, Separator, AspectRatio, Skeleton, BentoGrid, Window
- **Forms**: Input, Textarea, Checkbox, RadioGroup, Slider, Switch, Toggle, ToggleGroup, Label, Form (validation helpers)
- **Overlay**: Modal, Sheet, DropdownMenu, Popover, Tooltip, Command, Toaster (Toast notifications)
- **Navigation**: Tabs, Select, Pagination, Breadcrumbs, DatePicker, Calendar
- **Advanced**: Accordion, Avatar, ErrorBoundary, Collapsible, ScrollArea, Progress, Table

## Design System

Styling is handled via Tailwind CSS v4 with OKLCH color tokens defined in the `@theme` block. Override tokens in your global CSS to customize:

```css
@import "tailwindcss";
@import "@neobr/svelte/style";

@theme {
    --color-primary: oklch(78.5% 0.08 270);
    --color-secondary: oklch(81.5% 0.12 45);
    --font-neobr-mono: "JetBrains Mono", monospace;
    --radius-brutalist-soft: 8px;
    --lift-brutalist: 2px;
    --press-brutalist: 5px;
}

.dark {
    --color-primary: oklch(72.5% 0.12 270);
}
```

### Key Tokens

| Token family                                                                                                                                             | Default / values                        | Description                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| `--color-background`, `--color-foreground`                                                                                                               | Light and dark OKLCH surface/ink values | Page background, text, and borders       |
| `--color-primary-*`, `--color-secondary-*`                                                                                                               | Lavender and peach OKLCH states         | Primary and secondary actions            |
| `--color-destructive-*`, `--color-success-*`, `--color-warning-*`                                                                                        | Red, green, and yellow OKLCH states     | Semantic status colors                   |
| `--color-muted-*`, `--color-accent-*`                                                                                                                    | Matching muted/accent OKLCH aliases     | shadcn-compatible muted/accent surfaces  |
| `--color-border`, `--color-input`                                                                                                                        | Muted-scale aliases                     | shadcn-compatible `border-border` / `border-input` classes (components themselves draw with `border-foreground`) |
| `--color-ring`, `--color-card-*`, `--color-shadow-color`                                                                                                 | OKLCH ring, card, and shadow ink values | Focus rings, card surfaces, shadows      |
| `--font-neobr-mono`                                                                                                                                      | `"JetBrains Mono", monospace`           | Optional NeoBr mono font                 |
| `--radius-brutalist`, `--radius-brutalist-soft`, `--radius-brutalist-rounded`                                                                            | `0px`, `6px`, `12px`                    | Sharp, soft, and rounded component radii |
| `--shadow-brutalist`, `--shadow-brutalist-hover`                                                                                                         | `0px 5px 0px 0px`, `0px 8px 0px 0px`    | Rest and hover shadows                   |
| `--separator-width`                                                                                                                                      | `3px`                                   | Separator thickness                      |
| `--lift-brutalist`, `--press-brutalist`, `--press-brutalist-sm`                                                                                          | `2px`, `5px`, `2px`                     | Hover lift and active press distances    |
| `--z-select(-backdrop)`, `--z-dropdown(-backdrop)`, `--z-modal(-backdrop)`, `--z-sheet(-backdrop)`, `--z-popover(-backdrop)`, `--z-tooltip`, `--z-toast` | `38-100`                                | Layering scale and backdrop layers       |
| `--animate-fade-in`, `--animate-slide-*`                                                                                                                 | `0.3s` fade/slide animations            | Public animation utilities               |
| `--animate-marquee(-reverse)`, `--animate-neobr-tail`, `--animate-progress-indeterminate`, `--animate-skeleton-shimmer`, `--animate-skeleton-pulse`       | Looping/entry animations                | Marquee, loading, progress, skeleton motion |

### Utility Classes

| Class                 | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| `btn-brutalist`       | Full button styling (border, shadow, hover lift) |
| `container-brutalist` | Card/container with border, shadow, radius       |
| `input-brutalist`     | Form input with brutalist styling                |
| `card-brutalist`      | Card with background, border, shadow, radius     |
| `rounded-brutalist`   | `border-radius: 0px`                             |
| `shadow-brutalist`    | Centered bottom shadow                           |
| `tracking-brutalist`  | `letter-spacing: 0.1em`                          |

Component defaults are emitted as composable Tailwind classes through `cn()`, so consumer
classes such as `rounded-lg`, `shadow-none`, `border-0`, or `p-2` override the defaults.
The `*-brutalist` utilities remain available for app markup, but components avoid relying on
bundled utilities where that would make overrides ambiguous.
Box utilities such as `card-brutalist` and `container-brutalist` do not include padding; add
spacing explicitly where needed.
