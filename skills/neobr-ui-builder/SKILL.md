---
name: neobr-ui-builder
description: Build app UI with NeoBr-UI using @neobr/svelte components, Svelte 5 runes/snippets, Tailwind CSS v4 classes, accessible composition, and Neo-Brutalist conventions. Use this whenever the user is building pages, forms, navigation, overlays, dashboards, cards, settings screens, or interactive Svelte UI with NeoBr-UI, even if they only mention @neobr/svelte or "NeoBr components".
---

# NeoBr-UI Builder

Use `@neobr/svelte` as the UI layer for Svelte 5 apps. Prefer existing NeoBr-UI components before writing custom markup.

## First Checks

- Confirm the app uses Svelte 5 and Tailwind CSS v4.
- If styles are missing, use the `neobr-ui-theming` skill instead of guessing.
- Import components from `@neobr/svelte` for convenience, or from subpaths like `@neobr/svelte/button` when the user cares about smaller imports.

## Component Choices

- Actions: `Button`, `Link`, `Toggle`, `ToggleGroup`.
- Forms: `Form`, `FormItem`, `FormLabel`, `FormDescription`, `FormMessage`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Slider`, `Switch`, `Select`, `DatePicker`, `Calendar`.
- Feedback: `Alert`, `Badge`, `Loading`, `Progress`, `Skeleton`, `toast`, `Toaster`, `ErrorBoundary`.
- Layout: `Card`, `Separator`, `AspectRatio`, `BentoGrid`, `Window`, `ScrollArea`.
- Overlays: `Modal`, `Sheet`, `DropdownMenu`, `Popover`, `Tooltip`, `Command`.
- Navigation: `Tabs`, `Pagination`, `Breadcrumbs`, `Accordion`, `Collapsible`.
- Media and identity: `Avatar`, `Icon`, `Sticker`, `Marquee`.

## Coding Rules

- Use Svelte 5 syntax: `$state`, `$derived`, `$effect`, `onclick`, `onblur`, and snippets.
- Keep component APIs simple. Use native HTML attributes where NeoBr components forward them.
- Let consumer classes override defaults. NeoBr-UI intentionally supports `class` overrides such as `rounded-lg`, `shadow-none`, `border-0`, `p-2`, and layout classes.
- Use `radius="brutalist" | "soft" | "rounded"` on bordered components that support it. Do not use the removed `brutalist` boolean prop.
- Add spacing explicitly. Box utilities like `card-brutalist` and `container-brutalist` do not include padding.
- Use real controls for accessibility: labels for inputs, button elements for actions, links for navigation, and visible focus states.

## Imports

```svelte
<script lang="ts">
    import { Button, Card, CardContent, CardHeader, CardTitle } from "@neobr/svelte";
</script>
```

Use subpath imports when helpful:

```svelte
<script lang="ts">
    import { Button } from "@neobr/svelte/button";
    import { Input } from "@neobr/svelte/input";
</script>
```

## Forms

For validated forms, use `createFormState` and `z` from `@neobr/svelte/form`.

```svelte
<script lang="ts">
    import { Button, Form, FormItem, FormLabel, FormMessage, Input } from "@neobr/svelte";
    import { createFormState, z } from "@neobr/svelte/form";

    const schema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string().min(8, "Use at least 8 characters"),
    });

    const form = createFormState({
        schema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });
</script>

<Form onsubmit={form.handleSubmit}>
    <FormItem error={form.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" bind:value={form.values.email} onblur={() => form.handleBlur("email")} />
        {#if form.errors.email}
            <FormMessage>{form.errors.email}</FormMessage>
        {/if}
    </FormItem>

    <Button type="submit" disabled={form.isSubmitting}>Sign in</Button>
</Form>
```

String fields default to `""`. Provide `initialValues` for number, boolean, array, object, or date fields.

## Popover Trigger

`Popover` trigger snippets provide props. Spread them onto the trigger element.

```svelte
<Popover>
    {#snippet trigger(props)}
        <Button {...props}>Open</Button>
    {/snippet}

    Popover content
</Popover>
```

## Toasts

Render one `Toaster` near the app root before calling `toast`.

```svelte
<script lang="ts">
    import { Button, Toaster, toast } from "@neobr/svelte";
</script>

<Toaster />
<Button onclick={() => toast.success("Saved")}>Save</Button>
```

## Output Standard

When writing UI, return complete Svelte code that can be pasted into a page or component. Include only the imports needed by that code. Avoid adding new dependencies unless the user explicitly asks and the installed NeoBr-UI stack cannot cover the task.

