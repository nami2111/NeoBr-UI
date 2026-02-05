<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Label, Input } from "@neobr/svelte";

    const usage = `<Label for="email">Email</Label>`;
</script>

<DocPage title="Label" description="Renders an accessible label associated with a form control.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex items-center gap-4">
                    <Label for="terms">Accept terms and conditions</Label>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
