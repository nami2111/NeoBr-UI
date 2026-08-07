<script lang="ts">
    import { componentCategories, componentCount } from "$lib/component-catalog";
    import DocPage from "../../lib/components/DocPage.svelte";
    import { Card, CardHeader, CardTitle, CardDescription, Input, Badge, Icon } from "@neobr/svelte";
    import { ArrowRight02Icon, Search01Icon } from "@hugeicons/core-free-icons";

    let searchQuery = $state("");

    const filteredCategories = $derived(
        componentCategories
            .map((category) => ({
                ...category,
                items: category.items.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                ),
            }))
            .filter((category) => category.items.length > 0)
    );

    const visibleComponents = $derived(
        filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)
    );
</script>

<DocPage title="Components" description="Documented component groups exported by @neobr/svelte.">
    <div class="space-y-10 overflow-x-hidden">
        <div
            class="border-foreground bg-accent/10 grid gap-4 border-2 p-4 shadow-brutalist md:grid-cols-[1fr_auto]"
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
                <Badge variant="outline">{componentCount} total</Badge>
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
            <div class="border-foreground bg-muted flex flex-col items-center justify-center border-2 py-14 text-center shadow-brutalist">
                <p class="text-xl font-black">No Components Found</p>
                <p class="text-muted-foreground mt-2 text-sm font-bold">Try a different search term.</p>
            </div>
        {/if}
    </div>
</DocPage>
