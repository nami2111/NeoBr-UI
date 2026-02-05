<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Skeleton } from "@neobr/svelte";

    const usage = `<div class="flex items-center space-x-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
    </div>
</div>`;
</script>

<DocPage title="Skeleton" description="Use to show a placeholder while content is loading.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex items-center space-x-4">
                    <Skeleton class="h-12 w-12 rounded-full" />
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[200px]" />
                    </div>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Card Placeholder</h2>
            <CodePreview
                code={`<div class="flex flex-col space-y-3">
    <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
    </div>
</div>`}
            >
                <div class="flex flex-col space-y-3">
                    <Skeleton class="h-[125px] w-[250px]" />
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[200px]" />
                    </div>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
