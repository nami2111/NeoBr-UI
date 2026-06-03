<script lang="ts">
    import DocPage from "../../lib/components/DocPage.svelte";
    import { Card, CardHeader, CardTitle, CardDescription, Input, Badge, Icon } from "@neobr/svelte";
    import {
        Alert01Icon,
        ArrowRight02Icon,
        DashboardSquare01Icon,
        GridViewIcon,
        LayoutGridIcon,
        Search01Icon,
        Task01Icon,
        Touch01Icon,
        ViewIcon,
    } from "@hugeicons/core-free-icons";

    const categories = [
        {
            title: "Forms",
            icon: Task01Icon,
            items: [
                { name: "Button", href: "/components/button", description: "Interactive elements for actions" },
                { name: "Input", href: "/components/input", description: "Form input field" },
                { name: "Checkbox", href: "/components/checkbox", description: "Toggle check states" },
                { name: "Toggle", href: "/components/toggle", description: "Two-state button" },
                { name: "Slider", href: "/components/slider", description: "Range selection" },
                { name: "Textarea", href: "/components/textarea", description: "Multi-line text input" },
                { name: "Select", href: "/components/select", description: "Dropdown selection" },
                { name: "Radio Group", href: "/components/radio-group", description: "Single selection from options" },
                { name: "Form", href: "/components/form", description: "Forms with validation" },
                { name: "Label", href: "/components/label", description: "Accessible form labels" },
            ]
        },
        {
            title: "Layout",
            icon: LayoutGridIcon,
            items: [
                { name: "Accordion", href: "/components/accordion", description: "Collapsible sections" },
                { name: "Card", href: "/components/card", description: "Content container" },
                { name: "Bento Grid", href: "/components/bento-grid", description: "Variable-sized grid" },
                { name: "Collapsible", href: "/components/collapsible", description: "Expand/collapse panels" },
                { name: "Separator", href: "/components/separator", description: "Visual divider" },
                { name: "Aspect Ratio", href: "/components/aspect-ratio", description: "Content ratio container" },
            ]
        },
        {
            title: "Overlays",
            icon: ViewIcon,
            items: [
                { name: "Modal", href: "/components/modal", description: "Overlay window" },
                { name: "Popover", href: "/components/popover", description: "Triggered content" },
                { name: "Sheet", href: "/components/sheet", description: "Slide-in panel" },
                { name: "Toast", href: "/components/toast", description: "Notification message" },
                { name: "Tooltip", href: "/components/tooltip", description: "Hover information" },
            ]
        },
        {
            title: "Navigation",
            icon: Touch01Icon,
            items: [
                { name: "Breadcrumbs", href: "/components/breadcrumbs", description: "Path navigation" },
                { name: "Tabs", href: "/components/tabs", description: "Layered content" },
                { name: "Pagination", href: "/components/pagination", description: "Page navigation" },
                { name: "Link", href: "/components/link", description: "Text links" },
            ]
        },
        {
            title: "Feedback",
            icon: Alert01Icon,
            items: [
                { name: "Alert", href: "/components/alert", description: "User messages" },
                { name: "Badge", href: "/components/badge", description: "Status labels" },
                { name: "Progress", href: "/components/progress", description: "Completion indicator" },
                { name: "Loading", href: "/components/loading", description: "Spinner animation" },
                { name: "Skeleton", href: "/components/skeleton", description: "Loading placeholder" },
                { name: "Marquee", href: "/components/marquee", description: "Scrolling ticker" },
            ]
        },
        {
            title: "Data Display",
            icon: DashboardSquare01Icon,
            items: [
                { name: "Avatar", href: "/components/avatar", description: "User image" },
                { name: "Calendar", href: "/components/calendar", description: "Date picker" },
                { name: "Date Picker", href: "/components/date-picker", description: "Date selection" },
                { name: "Table", href: "/components/table", description: "Data table" },
                { name: "Scroll Area", href: "/components/scroll-area", description: "Custom scroll" },
            ]
        },
        {
            title: "Advanced",
            icon: GridViewIcon,
            items: [
                { name: "Dropdown Menu", href: "/components/dropdown-menu", description: "Action menu" },
                { name: "Command", href: "/components/command", description: "Command palette" },
                { name: "Switch", href: "/components/switch", description: "On/off toggle" },
                { name: "Toggle Group", href: "/components/toggle-group", description: "Button group" },
                { name: "Error Boundary", href: "/components/error-boundary", description: "Error handling" },
                { name: "Sticker", href: "/components/sticker", description: "Decorative badge" },
                { name: "Window", href: "/components/window", description: "OS window container" },
            ]
        },
    ];

    let searchQuery = $state("");

    const filteredCategories = $derived(
        categories
            .map((category) => ({
                ...category,
                items: category.items.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                ),
            }))
            .filter((category) => category.items.length > 0)
    );

    const totalComponents = $derived(
        categories.reduce((sum, cat) => sum + cat.items.length, 0)
    );

    const visibleComponents = $derived(
        filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)
    );
</script>

<DocPage title="Components" description="Beautifully designed, accessible components built with Svelte 5.">
    <div class="space-y-10 overflow-x-hidden">
        <div
            class="border-foreground bg-accent/10 grid gap-4 border-2 p-4 shadow-[0_5px_0_0_var(--color-shadow-color)] md:grid-cols-[1fr_auto]"
        >
            <label class="relative block">
                <span class="sr-only">Search components</span>
                <span class="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <Icon icon={Search01Icon} class="h-5 w-5" />
                </span>
                <Input
                    placeholder="Search by name or behavior..."
                    bind:value={searchQuery}
                    class="h-12 pl-10 text-base"
                />
            </label>
            <div class="flex flex-wrap items-center gap-2 md:justify-end">
                <Badge>{visibleComponents} shown</Badge>
                <Badge variant="outline">{totalComponents} total</Badge>
            </div>
        </div>

        {#each filteredCategories as category (category.title)}
            <section class="space-y-4">
                <div class="border-foreground flex items-center justify-between gap-4 border-b-2 pb-3">
                    <div class="flex items-center gap-3">
                        <span
                            class="border-foreground bg-primary inline-flex h-10 w-10 items-center justify-center border-2 text-primary-foreground shadow-[0_3px_0_0_var(--color-shadow-color)]"
                        >
                            <Icon icon={category.icon} class="h-5 w-5" />
                        </span>
                        <h2 class="text-2xl font-black">{category.title}</h2>
                    </div>
                    <Badge variant="secondary">{category.items.length}</Badge>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {#each category.items as item (item.href)}
                        <a href={item.href} class="group block font-mono hover:no-underline">
                            <Card
                                class="group-hover:bg-primary/5 group-hover:shadow-brutalist-hover h-full cursor-pointer transition-all group-hover:-translate-y-[2px]"
                            >
                                <CardHeader>
                                    <CardTitle
                                        class="group-hover:text-primary flex items-center justify-between gap-3 text-lg font-black transition-colors"
                                    >
                                        <span>{item.name}</span>
                                        <Icon
                                            icon={ArrowRight02Icon}
                                            class="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                                        />
                                    </CardTitle>
                                    <CardDescription class="text-foreground text-sm leading-relaxed font-bold">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </a>
                    {/each}
                </div>
            </section>
        {/each}

        {#if filteredCategories.length === 0}
            <div class="border-foreground bg-muted flex flex-col items-center justify-center border-2 py-14 text-center shadow-[0_5px_0_0_var(--color-shadow-color)]">
                <p class="text-xl font-black">No Components Found</p>
                <p class="text-muted-foreground mt-2 text-sm font-bold">Try a different search term.</p>
            </div>
        {/if}
    </div>
</DocPage>
