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
            title: "Button",
            description: "Interactive elements used for actions.",
            href: "/components/button",
        },
        { title: "Card", description: "Flexible container for content.", href: "/components/card" },
        // Add more here...
    ];
</script>

<DocPage title="Components" description="Explore our collection of neo-brutalist UI components.">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each components as component}
            <a href={component.href} class="group block hover:no-underline">
                <Card
                    class="border-foreground group-hover:bg-primary/5 h-full border-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
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
            class="border-foreground/20 flex items-center justify-center border-4 border-dashed p-6 text-center"
        >
            <p class="text-muted-foreground font-bold italic">More components coming soon...</p>
        </div>
    </div>
</DocPage>
