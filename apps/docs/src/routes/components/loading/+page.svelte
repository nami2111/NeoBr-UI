<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Loading } from "@neobr/svelte";

    const usage = `<Loading />`;
    const variants = `<Loading variant="default" />
<Loading variant="secondary" />
<Loading variant="muted" />`;
    const sizes = `<Loading size="sm" />
<Loading size="default" />
<Loading size="lg" />
<Loading size="xl" />`;
</script>

<DocPage title="Loading" description="Displays an animated loading spinner.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Loading />
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Variants</h2>
            <CodePreview code={variants}>
                <div class="flex items-center gap-6">
                    <Loading variant="default" />
                    <Loading variant="secondary" />
                    <Loading variant="muted" />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Sizes</h2>
            <CodePreview code={sizes}>
                <div class="flex items-center gap-6">
                    <Loading size="sm" />
                    <Loading size="default" />
                    <Loading size="lg" />
                    <Loading size="xl" />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
