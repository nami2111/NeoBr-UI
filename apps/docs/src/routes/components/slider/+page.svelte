<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Slider, Label } from "@neobr/svelte";

    let value = $state(50);
</script>

<DocPage title="Slider" description="An input where the user selects a value from a given range.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={`<Slider bind:value={value} />`}>
                <div class="w-full max-w-sm space-y-4">
                    <div class="flex items-center justify-between">
                        <Label>Volume</Label>
                        <span class="text-sm font-bold">{value}</span>
                    </div>
                    <Slider bind:value />
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Steps</h2>
            <CodePreview code={`<Slider step={25} bind:value />`}>
                <div class="w-full max-w-sm space-y-4">
                    <Slider step={25} bind:value />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
