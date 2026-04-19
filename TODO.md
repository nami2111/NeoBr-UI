# NeoBr-UI Documentation Website Redesign Plan

## Overview

Transform the current documentation site into a professional UI library website similar to shadcn/ui, base-ui, with:
- **Homepage**: Marketing landing page (no sidebar, full-width)
- **Components Gallery**: Grid-based component browser
- **Documentation**: Separate docs section with sidebar

---

## Current State Analysis

### Route Structure (Before)
```
/                              → Homepage with hero + features + sidebar
/docs                            → Redirect → /docs/installation
/docs/introduction               → Introduction
/docs/installation              → Installation guide
/components                    → Component listing (redirects to accordion)
/components/accordion          → Individual page
/components/alert             → ...
/components/*                 → Individual component pages
```

### Issues
1. Homepage has sidebar - feels like docs page, not landing page
2. No `/components` index - no central gallery
3. `/components` route shows no content (likely redirect)
4. No dedicated docs layout - sidebar on all pages

---

## Target Route Structure (After)

```
/                              → Homepage (landing, NO sidebar)
/components                    → Components gallery INDEX (NEW)
/components/accordion         → Individual component pages
/components/*                 → ...
/docs                         → Redirect → /docs/introduction
/docs/+layout.svelte          → Docs layout WITH sidebar (NEW)
/docs/introduction            → Introduction
/docs/installation           → Installation guide
```

---

## Implementation Tasks

### Phase 1: Create Docs Layout (Priority: HIGH)

**File:** `src/routes/docs/+layout.svelte`

```svelte
<!-- Copy from main layout but add sidebar -->
<script>
    import "../../lib/components/Sidebar.svelte";
    import ThemeToggle from "../../lib/components/ThemeToggle.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

    let { children } = $props();
    let isMobileMenuOpen = $state(false);
</script>

<Toaster />

<div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 px-6">
        <div class="flex items-center gap-4">
            <Button variant="outline" size="sm" class="lg:hidden" onclick={toggleMobileMenu}>
                <Icon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} />
            </Button>
            <a href="/" class="text-2xl font-black">NEOBR-UI</a>
        </div>
        <div class="flex items-center gap-4">
            <a href="https://github.com/nami2111/NeoBr-UI" target="_blank">GitHub</a>
            <ThemeToggle />
        </div>
    </header>

    <div class="flex flex-1">
        <!-- Sidebar -->
        <Sidebar class="sticky top-16 hidden h-[calc(100vh-64px)] shrink-0 lg:block" />

        <!-- Mobile overlay -->
        {#if isMobileMenuOpen}
            <div class="fixed inset-0 z-40 bg-black/50 lg:hidden" onclick={toggleMobileMenu}></div>
            <div class="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
                <Sidebar class="h-full" />
            </div>
        {/if}

        <!-- Main Content -->
        <main class="mx-auto w-full max-w-5xl flex-1 p-6 md:p-10">
            {@render children?.()}
        </main>
    </div>
</div>
```

---

### Phase 2: Redesign Homepage (Priority: HIGH)

**File:** `src/routes/+page.svelte`

**New Sections:**

1. **Hero Section**
   - Full-width, centered
   - Title: "NeoBr UI: The Foundation for your Design System"
   - Subtitle: "A set of beautifully designed components that you can customize, extend, and build on."
   - Two CTAs: "Get Started", "View Components"

2. **Installation Section**
   - Code block showing `npm install @neobr/svelte`

3. **Features Grid**
   - 3-4 cards: "Svelte 5 Powered", "Accessible", "Neo-Brutalist", "Open Source"

4. **Interactive Preview**
   - Live component demo (slider, switch, button, etc.)

5. **All Components Preview**
   - Grid showing key components
   - "View All Components" link → `/components`

6. **CTA Section**
   - "Ready to build something bold?"
   - Link to installation

---

### Phase 3: Create Components Gallery Index (Priority: HIGH)

**File:** `src/routes/components/+page.svelte` (NEW)

```svelte
<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, Badge, Input } from "@neobr/svelte";
    import { Search01Icon, Icon } from "@hugeicons/core-free-icons";

    // Component categories
    const categories = [
        {
            title: "Forms",
            items: [
                { name: "Button", href: "/components/button", status: "stable" },
                { name: "Input", href: "/components/input", status: "stable" },
                { name: "Checkbox", href: "/components/checkbox", status: "stable" },
                { name: "Toggle", href: "/components/toggle", status: "stable" },
                { name: "Slider", href: "/components/slider", status: "stable" },
                { name: "Textarea", href: "/components/textarea", status: "stable" },
                { name: "Select", href: "/components/select", status: "stable" },
                { name: "Radio Group", href: "/components/radio-group", status: "stable" },
                { name: "Form", href: "/components/form", status: "stable" },
            ]
        },
        {
            title: "Layout",
            items: [
                { name: "Accordion", href: "/components/accordion" },
                { name: "Card", href: "/components/card" },
                { name: "Bento Grid", href: "/components/bento-grid" },
                { name: "Collapsible", href: "/components/collapsible" },
                { name: "Separator", href: "/components/separator" },
                { name: "Aspect Ratio", href: "/components/aspect-ratio" },
            ]
        },
        {
            title: "Overlays",
            items: [
                { name: "Modal", href: "/components/modal" },
                { name: "Popover", href: "/components/popover" },
                { name: "Sheet", href: "/components/sheet" },
                { name: "Toast", href: "/components/toast" },
                { name: "Tooltip", href: "/components/tooltip" },
            ]
        },
        {
            title: "Navigation",
            items: [
                { name: "Breadcrumbs", href: "/components/breadcrumbs" },
                { name: "Tabs", href: "/components/tabs" },
                { name: "Pagination", href: "/components/pagination" },
                { name: "Link", href: "/components/link" },
            ]
        },
        {
            title: "Feedback",
            items: [
                { name: "Alert", href: "/components/alert" },
                { name: "Badge", href: "/components/badge" },
                { name: "Progress", href: "/components/progress" },
                { name: "Loading", href: "/components/loading" },
                { name: "Skeleton", href: "/components/skeleton" },
            ]
        },
        {
            title: "Data Display",
            items: [
                { name: "Avatar", href: "/components/avatar" },
                { name: "Calendar", href: "/components/calendar" },
                { name: "Date Picker", href: "/components/date-picker" },
                { name: "Table", href: "/components/table" },
            ]
        },
    ];

    let searchQuery = $state("");
    let filteredCategories = $derived(
        categories.map(cat => ({
            ...cat,
            items: cat.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.items.length > 0)
    );
</script>

<div class="space-y-10 py-10">
    <!-- Header -->
    <div class="text-center space-y-4">
        <h1 class="text-5xl font-black tracking-tighter uppercase">Components</h1>
        <p class="text-xl text-muted-foreground">
            Beautifully designed, fully accessible components built with Svelte 5.
        </p>
    </div>

    <!-- Search -->
    <div class="mx-auto max-w-md">
        <Input placeholder="Search components..." bind:value={searchQuery} />
    </div>

    <!-- Categories Grid -->
    {#each filteredCategories as category}
        <section class="space-y-4">
            <h2 class="text-2xl font-black tracking-tighter uppercase">{category.title}</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each category.items as item}
                    <a href={item.href}>
                        <Card class="hover:shadow-brutalist-hover transition-all hover:-translate-y-1">
                            <CardHeader>
                                <CardTitle class="text-lg font-black uppercase">{item.name}</CardTitle>
                                <CardDescription>
                                    {item.description || "A flexible and reusable component."}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </a>
                {/each}
            </div>
        </section>
    {/each}
</div>
```

---

### Phase 4: Update Main Layout for Homepage Only

**File:** `src/routes/+layout.svelte`

**Remove sidebar** - Currently shows sidebar on all pages. Should only show on docs pages now.

**Modified structure:**

```svelte
<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
    import { page } from "$app/state";

    let { children } = $props();

    // Show sidebar only on specific routes
    const showSidebar = $derived(
        page.url.pathname.startsWith("/docs") ||
        page.url.pathname.startsWith("/components") && page.url.pathname !== "/components"
    );
</script>

<!-- Only show header + sidebar if on docs/components pages -->
{#if showSidebar}
    <!-- Include sidebar layout -->
{:else}
    <!-- Homepage layout (no sidebar) -->
{/if}
```

**Actually:** Better approach - keep the layout simple for homepage and use separate layouts per section (see Phase 1).

---

### Phase 5: Files to Modify Summary

| File | Action | Priority |
|------|-------|---------|
| `src/routes/+page.svelte` | Redesign homepage | HIGH |
| `src/routes/docs/+layout.svelte` | Create (NEW) | HIGH |
| `src/routes/components/+page.svelte` | Create gallery index | HIGH |
| `src/routes/+layout.svelte` | Simplify (homepage only) | MEDIUM |
| `src/routes/components/[slug]/+page.svelte` | Check/update | LOW |

---

## Design System Tokens (Reference)

From `packages/svelte/src/lib/styles/design-system.css`

### Colors (OKLCH)
- `--color-primary`: Lavender/Blue
- `--color-secondary`: Peach/Warm
- `--color-accent`: Additional accent
- `--color-background`: Clean off-white
- `--color-foreground`: High-contrast dark
- `--color-muted-foreground`: Muted text

### Structural
- `--radius-brutalist`: 12px
- `--shadow-brutalist`: 0px 5px 0px 0px
- `--shadow-brutalist-hover`: 0px 8px 0px 0px

### Typography
- Font: JetBrains Mono (primary)
- Casing: Title Case for headings

---

## Implementation Order

1. **Create `src/routes/docs/+layout.svelte`** - Docs-specific layout with sidebar
2. **Move Sidebar to docs layout** - Update sidebar import in docs layout
3. **Simplify `src/routes/+layout.svelte`** - Remove sidebar logic
4. **Redesign homepage** - Full marketing-style landing
5. **Create components gallery** - Grid index page

---

## shadcn/ui Reference Structure

See: https://ui.shadcn.com

| Page | Content |
|------|--------|
| `/` | Hero, value props, installation code, components preview, CTA |
| `/components` | Grid gallery with search, categorized components |
| `/docs/introduction` | What is NeoBr-UI |
| `/docs/installation` | npm install + setup |
| `/components/button` | Individual component docs |

---

## Done when:
- [x] Homepage is full-width landing with no sidebar
- [x] `/components` shows grid gallery of all components
- [x] Docs pages have dedicated layout with sidebar
- [x] Clean separation between homepage, docs, and components