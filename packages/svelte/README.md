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

- **General**: Button, Icon, Link, Badge, Loading, Sticker, Marquee
- **Layout**: Card, Separator, AspectRatio, Skeleton, BentoGrid, Window
- **Forms**: Input, Textarea, Checkbox, RadioGroup, Slider, Switch, Toggle, ToggleGroup, Form (validation helpers)
- **Overlay**: Modal, Sheet, DropdownMenu, Popover, Tooltip, Command, Toaster (Toast notifications)
- **Navigation**: Tabs, Select, Pagination, Breadcrumbs, DatePicker, Calendar
- **Advanced**: Accordion, Avatar, ErrorBoundary, Collapsible, ScrollArea

## Design System

Styling is handled via Tailwind CSS v4 with OKLCH color tokens defined in the `@theme` block. Override tokens in your global CSS to customize:

```css
@import "tailwindcss";
@import "@neobr/svelte/style";

@theme {
    --color-primary: oklch(78.5% 0.08 270);
    --color-secondary: oklch(81.5% 0.12 45);
    --font-neobr-sans: "JetBrains Mono", monospace;
    --font-neobr-mono: "JetBrains Mono", monospace;
    --radius-brutalist-soft: 8px;
}

.dark {
    --color-primary: oklch(72.5% 0.12 270);
}
```

### Key Tokens

| Token                | Default           | Description            |
| -------------------- | ----------------- | ---------------------- |
| `--color-primary`    | Lavender OKLCH    | Primary action color   |
| `--color-secondary`  | Peach OKLCH       | Secondary accent color |
| `--color-foreground` | Dark OKLCH        | Text and borders       |
| `--color-background` | Light OKLCH       | Page background        |
| `--font-neobr-sans`  | JetBrains Mono    | Optional NeoBr UI font |
| `--font-neobr-mono`  | JetBrains Mono    | Optional NeoBr mono font |
| `--radius-brutalist` | `0px`             | Sharp brutalist radius |
| `--shadow-brutalist` | `0px 5px 0px 0px` | Centered bottom shadow |

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
