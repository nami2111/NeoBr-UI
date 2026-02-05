<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Checkbox, Label } from "@neobr/svelte";

    let checked = $state(true);
</script>

<DocPage
    title="Checkbox"
    description="A control that allows the user to toggle between checked and unchecked states."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={`<Checkbox id="terms" bind:checked />`}>
                <div class="flex items-center space-x-2">
                    <Checkbox id="terms" bind:checked />
                    <Label for="terms" class="cursor-pointer">Accept terms and conditions</Label>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Disabled</h2>
            <CodePreview code={`<Checkbox id="disabled" disabled />`}>
                <div class="flex items-center space-x-2">
                    <Checkbox id="disabled" disabled />
                    <Label for="disabled" class="opacity-50">Disabled checkbox</Label>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
