<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Switch, Label } from "@neobr/svelte";

    let checked = $state(false);
</script>

<DocPage
    title="Switch"
    description="A control that allows the user to toggle between on and off states."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={`<Switch bind:checked />`}>
                <div class="flex items-center space-x-2">
                    <Switch id="airplane-mode" bind:checked />
                    <Label for="airplane-mode">Airplane Mode</Label>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Radius</h2>
            <CodePreview code={`<Switch radius="rounded" />`}>
                <div class="flex items-center space-x-2">
                    <Switch id="rounded-switch" radius="rounded" />
                    <Label for="rounded-switch">Rounded Mode</Label>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
