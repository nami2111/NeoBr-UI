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
            title: "Button",
            description: "Interactive elements used for actions.",
            href: "/components/button",
        },
        { title: "Card", description: "Flexible container for content.", href: "/components/card" },
        {
            title: "Checkbox",
            description: "A control that allows the user to toggle check states.",
            href: "/components/checkbox",
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
            title: "Progress",
            description: "Displays completion progress of a task.",
            href: "/components/progress",
        },
        {
            title: "Separator",
            description: "Separates content visually.",
            href: "/components/separator",
        },
        {
            title: "Skeleton",
            description: "Placeholder for loading content.",
            href: "/components/skeleton",
        },
        { title: "Slider", description: "Range selection input.", href: "/components/slider" },
        { title: "Switch", description: "Binary on/off control.", href: "/components/switch" },
        { title: "Tabs", description: "Layered sections of content.", href: "/components/tabs" },
        { title: "Textarea", description: "Multi-line text input.", href: "/components/textarea" },
        { title: "Toggle", description: "Two-state button.", href: "/components/toggle" },
        {
            title: "Toggle Group",
            description: "A set of toggle buttons.",
            href: "/components/toggle-group",
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
