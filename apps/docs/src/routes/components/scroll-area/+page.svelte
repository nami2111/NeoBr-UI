<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { ScrollArea, Separator } from "@neobr/svelte";

    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<DocPage
    title="Scroll Area"
    description="Augments native scroll functionality for custom, cross-browser styling."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview
                code={`<ScrollArea class="h-72 w-48">
    <div class="p-4">
        <h4 class="mb-4 text-sm font-bold leading-none">Tags</h4>
        {#each tags as tag}
            <div class="text-sm">{tag}</div>
            <Separator class="my-2" />
        {/each}
    </div>
</ScrollArea>`}
            >
                <ScrollArea class="h-72 w-64">
                    <div class="p-6">
                        <h4
                            class="border-foreground mb-6 border-b-2 pb-1 text-lg font-black tracking-tighter uppercase"
                        >
                            Versions
                        </h4>
                        {#each tags as tag}
                            <div class="py-1 font-mono text-sm font-bold">{tag}</div>
                            <Separator class="my-2" />
                        {/each}
                    </div>
                </ScrollArea>
            </CodePreview>
        </section>
    </div>
</DocPage>
