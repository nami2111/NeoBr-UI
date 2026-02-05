<script lang="ts">
    import { page } from "$app/state";
    import { Link } from "@neobr/svelte";

    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/" },
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
                { title: "Breadcrumbs", href: "/components/breadcrumbs" },
                { title: "Button", href: "/components/button" },
                { title: "Card", href: "/components/card" },
                { title: "Checkbox", href: "/components/checkbox" },
                { title: "Collapsible", href: "/components/collapsible" },
                { title: "Command", href: "/components/command" },
                { title: "Dropdown Menu", href: "/components/dropdown-menu" },
                { title: "Form", href: "/components/form" },
                { title: "Input", href: "/components/input" },
                { title: "Label", href: "/components/label" },
                { title: "Link", href: "/components/link" },
                { title: "Loading", href: "/components/loading" },
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
                { title: "Switch", href: "/components/switch" },
                { title: "Tabs", href: "/components/tabs" },
                { title: "Textarea", href: "/components/textarea" },
                { title: "Toast", href: "/components/toast" },
                { title: "Toggle", href: "/components/toggle" },
                { title: "Toggle Group", href: "/components/toggle-group" },
                { title: "Tooltip", href: "/components/tooltip" },
            ],
        },
    ];

    let { class: className = "" } = $props<{ class?: string }>();

    function isActive(href: string) {
        if (href === "/") {
            return page.url.pathname === "/";
        }
        return page.url.pathname.startsWith(href);
    }
</script>

<aside
    class="border-foreground bg-background h-full w-64 space-y-8 overflow-y-auto border-r-4 p-6 {className}"
>
    {#each sections as section}
        <div class="space-y-3">
            <h4 class="text-muted-foreground text-sm font-black tracking-tighter uppercase">
                {section.title}
            </h4>
            <div class="flex flex-col gap-1">
                {#each section.items as item}
                    <a
                        href={item.href}
                        class="rounded-none border-2 px-3 py-2 text-sm font-bold transition-all {isActive(
                            item.href,
                        )
                            ? 'bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                            : 'hover:border-foreground hover:bg-accent border-transparent'}"
                    >
                        {item.title}
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</aside>
