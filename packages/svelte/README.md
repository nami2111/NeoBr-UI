# @neobr/svelte

A Svelte 5 Neo-Brutalist component library.

## Installation

```bash
npm install @neobr/svelte
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
```

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
