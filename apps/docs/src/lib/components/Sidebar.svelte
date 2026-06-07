<script lang="ts">
    import { page } from "$app/state";
    import { Link, ScrollArea, Input } from "@neobr/svelte";

    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/docs/introduction" },
                { title: "Installation", href: "/docs/installation" },
            ],
        },
        {
            title: "Components",
            items: [
                { title: "Accordion", href: "/components/accordion" },
                { title: "Alert", href: "/components/alert" },
                { title: "Aspect Ratio", href: "/components/aspect-ratio" },
                { title: "Avatar", href: "/components/avatar" },
                { title: "Badge", href: "/components/badge" },
                { title: "Bento Grid", href: "/components/bento-grid" },
                { title: "Breadcrumbs", href: "/components/breadcrumbs" },
                { title: "Button", href: "/components/button" },
                { title: "Calendar", href: "/components/calendar" },
                { title: "Card", href: "/components/card" },
                { title: "Checkbox", href: "/components/checkbox" },
                { title: "Collapsible", href: "/components/collapsible" },
                { title: "Command", href: "/components/command" },
                { title: "Date Picker", href: "/components/date-picker" },
                { title: "Dropdown Menu", href: "/components/dropdown-menu" },
                { title: "Error Boundary", href: "/components/error-boundary" },
                { title: "Form", href: "/components/form" },
                { title: "Icon", href: "/components/icon" },
                { title: "Input", href: "/components/input" },
                { title: "Label", href: "/components/label" },
                { title: "Link", href: "/components/link" },
                { title: "Loading", href: "/components/loading" },
                { title: "Marquee", href: "/components/marquee" },
                { title: "Modal", href: "/components/modal" },
                { title: "Pagination", href: "/components/pagination" },
                { title: "Popover", href: "/components/popover" },
                { title: "Progress", href: "/components/progress" },
                { title: "Radio Group", href: "/components/radio-group" },
                { title: "Scroll Area", href: "/components/scroll-area" },
                { title: "Select", href: "/components/select" },
                { title: "Separator", href: "/components/separator" },
                { title: "Sheet", href: "/components/sheet" },
                { title: "Skeleton", href: "/components/skeleton" },
                { title: "Slider", href: "/components/slider" },
                { title: "Sticker", href: "/components/sticker" },
                { title: "Switch", href: "/components/switch" },
                { title: "Table", href: "/components/table" },
                { title: "Tabs", href: "/components/tabs" },
                { title: "Textarea", href: "/components/textarea" },
                { title: "Toast", href: "/components/toast" },
                { title: "Toggle", href: "/components/toggle" },
                { title: "Toggle Group", href: "/components/toggle-group" },
                { title: "Tooltip", href: "/components/tooltip" },
                { title: "Window", href: "/components/window" },
            ],
        },
    ];

    let searchQuery = $state("");

    const filteredSections = $derived(
        sections
            .map((section) => ({
                ...section,
                items: section.items.filter((item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            }))
            .filter((section) => section.items.length > 0),
    );

    let { class: className = "" } = $props<{ class?: string }>();

    function isActive(href: string) {
        if (href === "/") {
            return page.url.pathname === "/";
        }
        return page.url.pathname.startsWith(href);
    }
</script>

<aside class="bg-background flex w-64 flex-col overflow-hidden {className}">
    <div class="border-foreground shrink-0 border-b-2 p-4">
        <Input
            placeholder="Search components..."
            bind:value={searchQuery}
            class="h-9 px-3 text-sm"
        />
    </div>
    <ScrollArea class="flex-1 rounded-none border-0 border-r-2 shadow-none" orientation="vertical">
        <div class="space-y-8 p-6">
            {#each filteredSections as section (section.title)}
                <div class="space-y-3">
                    <h4 class="text-muted-foreground text-sm font-black tracking-tighter uppercase">
                        {section.title}
                    </h4>
                    <div class="flex flex-col gap-1">
                        {#each section.items as item (item.href)}
                            <a
                                href={item.href}
                                class="border-2 px-3 py-2 text-sm font-bold transition-all {isActive(
                                    item.href,
                                )
                                    ? 'bg-primary text-primary-foreground border-foreground rounded-brutalist'
                                    : 'hover:border-foreground hover:bg-accent rounded-none border-transparent'}"
                            >
                                {item.title}
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
            {#if filteredSections.length === 0}
                <p class="text-muted-foreground py-10 text-center text-sm font-bold italic">
                    No components found
                </p>
            {/if}
        </div>
    </ScrollArea>
</aside>
