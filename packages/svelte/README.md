# @neobr/svelte

A Svelte 5 Neo-Brutalist component library.

## Installation

```bash
pnpm add @neobr/svelte zod
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
  import { Button, Card, CardTitle, CardContent } from "@neobr/svelte";
</script>

<Card>
  <CardHeader>
    <CardTitle>Hello Brutalism</CardTitle>
  </CardHeader>
  <CardContent>
    <Button onclick={() => console.log('Brutal!')}>
      Click Me
    </Button>
  </CardContent>
</Card>

## Form Validation (Zod)

NeoBr-UI provides built-in integration with Zod for type-safe form validation using Svelte 5 runes.

```svelte
<script>
  import { createFormState, z } from "@neobr/svelte/form";
  import { Form, FormItem, FormLabel, FormMessage, Input, Button } from "@neobr/svelte";

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Too short")
  });

  const form = createFormState({
    schema,
    onSubmit: async (values) => {
      console.log("Form data:", values);
    }
  });
</script>

<form onsubmit={form.handleSubmit}>
  <FormItem error={form.errors.email}>
    <FormLabel>Email</FormLabel>
    <Input type="email" bind:value={form.values.email} onblur={() => form.handleBlur("email")} />
    {#if form.errors.email}
      <FormMessage>{form.errors.email}</FormMessage>
    {/if}
  </FormItem>
  
  <Button type="submit" disabled={form.isSubmitting}>Sign In</Button>
</form>

## Available Components

- **General**: Button, Icon, Link, Badge, Loading
- **Layout**: Card, Separator
- **Forms**: Input, Checkbox, RadioGroup, Slider, Switch, Form (validation helpers)
- **Overlay**: Modal, DropdownMenu, Tooltip, Toaster (Toast notifications)
- **Advanced**: Accordion, Tabs, Select, Avatar, ErrorBoundary

## Styling

Styling is handled via Vanilla CSS and custom design tokens defined in the `:root`. You can override these in your own global CSS to customize the look.

```css
:root {
  --radius: 0px; /* Force sharp edges */
  --primary: #ff00ea; /* Change primary color */
}
```
