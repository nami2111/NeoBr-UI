<script lang="ts">
    import { page } from "$app/state";
    import { componentItems } from "$lib/component-catalog";
    import { ScrollArea, Input } from "@neobr/svelte";

    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/docs/introduction", description: "Overview and usage" },
                { title: "Installation", href: "/docs/installation", description: "Install and setup" },
            ],
        },
        {
            title: "Components",
            items: componentItems.map((item) => ({
                title: item.name,
                href: item.href,
                description: item.description,
            })),
        },
    ];

    let searchQuery = $state("");

    const filteredSections = $derived(
        sections
            .map((section) => ({
                ...section,
                items: section.items.filter((item) => {
                    const query = searchQuery.toLowerCase();
                    return (
                        item.title.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query)
                    );
                }),
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
            aria-label="Search documentation"
            name="docs-search"
            bind:value={searchQuery}
            class="h-9 px-3 text-sm"
        />
    </div>
    <ScrollArea class="flex-1 rounded-none border-0 border-r-2 shadow-none" orientation="vertical">
        <div class="space-y-8 p-6">
            {#each filteredSections as section (section.title)}
                <div class="space-y-3">
                    <p class="text-muted-foreground text-sm font-black tracking-tighter uppercase">
                        {section.title}
                    </p>
                    <div class="flex flex-col gap-1">
                        {#each section.items as item (item.href)}
                            <a
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
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
