<script lang="ts">
    import DocPage from "../../lib/components/DocPage.svelte";
    import { Card, CardHeader, CardTitle, CardDescription } from "@neobr/svelte";

    const components = [
        {
            title: "Accordion",
            description: "Vertically stacked interactive headings.",
            href: "/components/accordion",
        },
        { title: "Alert", description: "Important messages for users.", href: "/components/alert" },
        {
            title: "Aspect Ratio",
            description: "Displays content within a desired ratio.",
            href: "/components/aspect-ratio",
        },
        {
            title: "Avatar",
            description: "An image element with a fallback for representing the user.",
            href: "/components/avatar",
        },
        {
            title: "Badge",
            description: "Small label for status or category.",
            href: "/components/badge",
        },
        {
            title: "Bento Grid",
            description: "Variable-sized grid system for stunning layouts.",
            href: "/components/bento-grid",
        },
        {
            title: "Breadcrumbs",
            description: "Displays the path to the current resource.",
            href: "/components/breadcrumbs",
        },
        {
            title: "Button",
            description: "Interactive elements used for actions.",
            href: "/components/button",
        },
        {
            title: "Calendar",
            description: "Date selection component with raw aesthetic.",
            href: "/components/calendar",
        },
        { title: "Card", description: "Flexible container for content.", href: "/components/card" },
        {
            title: "Checkbox",
            description: "A control that allows the user to toggle check states.",
            href: "/components/checkbox",
        },
        {
            title: "Collapsible",
            description: "Interactive component which expands/collapses a panel.",
            href: "/components/collapsible",
        },
        {
            title: "Command",
            description: "Fast, composable command menu.",
            href: "/components/command",
        },
        {
            title: "Date Picker",
            description: "Input field with calendar selection popover.",
            href: "/components/date-picker",
        },
        {
            title: "Dropdown Menu",
            description: "Displays a menu of actions triggered by a button.",
            href: "/components/dropdown-menu",
        },
        {
            title: "Form",
            description: "Building forms with validation.",
            href: "/components/form",
        },
        { title: "Input", description: "Displays a form input field.", href: "/components/input" },
        {
            title: "Label",
            description: "Accessible label for form controls.",
            href: "/components/label",
        },
        { title: "Link", description: "Neo-brutalist text link.", href: "/components/link" },
        { title: "Loading", description: "Animated loading spinner.", href: "/components/loading" },
        {
            title: "Marquee",
            description: "A scrolling ticker for bold messaging.",
            href: "/components/marquee",
        },
        {
            title: "Modal",
            description: "A window overlaid on the primary window.",
            href: "/components/modal",
        },
        {
            title: "Pagination",
            description: "Navigation between pages.",
            href: "/components/pagination",
        },
        {
            title: "Popover",
            description: "Rich content triggered by a button.",
            href: "/components/popover",
        },
        {
            title: "Progress",
            description: "Displays completion progress of a task.",
            href: "/components/progress",
        },
        {
            title: "Radio Group",
            description: "Set of checkable buttons where only one can be checked.",
            href: "/components/radio-group",
        },
        {
            title: "Scroll Area",
            description: "Custom cross-browser scroll functionality.",
            href: "/components/scroll-area",
        },
        {
            title: "Select",
            description: "List of options for user to pick from.",
            href: "/components/select",
        },
        {
            title: "Separator",
            description: "Separates content visually.",
            href: "/components/separator",
        },
        {
            title: "Sheet",
            description: "Complementary content that slides from side.",
            href: "/components/sheet",
        },
        {
            title: "Skeleton",
            description: "Placeholder for loading content.",
            href: "/components/skeleton",
        },
        { title: "Slider", description: "Range selection input.", href: "/components/slider" },
        {
            title: "Sticker",
            description: "Decorative badge with random rotation.",
            href: "/components/sticker",
        },
        { title: "Switch", description: "Binary on/off control.", href: "/components/switch" },
        {
            title: "Table",
            description: "A responsive table for structured data.",
            href: "/components/table",
        },
        { title: "Tabs", description: "Layered sections of content.", href: "/components/tabs" },
        { title: "Textarea", description: "Multi-line text input.", href: "/components/textarea" },
        {
            title: "Toast",
            description: "Succinct message after an action.",
            href: "/components/toast",
        },
        { title: "Toggle", description: "Two-state button.", href: "/components/toggle" },
        {
            title: "Toggle Group",
            description: "A set of toggle buttons.",
            href: "/components/toggle-group",
        },
        {
            title: "Tooltip",
            description: "Information on hover or focus.",
            href: "/components/tooltip",
        },
        {
            title: "Window",
            description: "A container mimicking classic OS windows.",
            href: "/components/window",
        },
    ];
</script>

<DocPage title="Components" description="Explore our collection of neo-brutalist UI components.">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each components as component}
            <a href={component.href} class="group block font-mono hover:no-underline">
                <Card
                    class="group-hover:bg-primary/5 group-hover:shadow-brutalist-hover h-full transition-all group-hover:-translate-y-1"
                >
                    <CardHeader>
                        <CardTitle
                            class="group-hover:text-primary text-xl font-black tracking-tighter uppercase transition-colors"
                        >
                            {component.title}
                        </CardTitle>
                        <CardDescription class="text-foreground font-medium italic">
                            {component.description}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </a>
        {/each}

        <div
            class="border-foreground/20 rounded-brutalist flex items-center justify-center border-2 border-dashed p-6 text-center"
        >
            <p class="text-muted-foreground font-bold italic">More components coming soon...</p>
        </div>
    </div>
</DocPage>
