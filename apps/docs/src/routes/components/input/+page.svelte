<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Input, Label } from "@neobr/svelte";

    const usage = `<Input type="email" placeholder="Email" />`;
    const disabled = `<Input disabled type="email" placeholder="Email" />`;
    const withLabel = `<div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="email">Email</Label>
    <Input type="email" id="email" placeholder="Email" />
</div>`;
</script>

<DocPage
    title="Input"
    description="Displays a form input field or a component that looks like an input field."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Input type="email" placeholder="Email" class="max-w-sm" />
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Disabled</h2>
            <CodePreview code={disabled}>
                <Input disabled type="email" placeholder="Email" class="max-w-sm" />
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">With Label</h2>
            <CodePreview code={withLabel}>
                <div class="grid w-full max-w-sm items-center gap-2">
                    <Label for="email-demo">Email</Label>
                    <Input type="email" id="email-demo" placeholder="Email" />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
