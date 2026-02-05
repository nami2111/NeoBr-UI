<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Textarea, Label } from "@neobr/svelte";

    const usage = `<Textarea placeholder="Type your message here." />`;
    const withLabel = `<div class="grid w-full gap-1.5">
    <Label for="message">Your message</Label>
    <Textarea placeholder="Type your message here." id="message" />
    <p class="text-sm text-muted-foreground font-medium">
        Your message will be sent to the support team.
    </p>
</div>`;
</script>

<DocPage
    title="Textarea"
    description="Displays a form textarea or a component that looks like a textarea."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Textarea placeholder="Type your message here." class="max-w-sm" />
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">With Label</h2>
            <CodePreview code={withLabel}>
                <div class="grid w-full max-w-sm gap-2">
                    <Label for="message-demo" class="font-bold">Your message</Label>
                    <Textarea placeholder="Type your message here." id="message-demo" />
                    <p class="text-muted-foreground text-sm font-medium italic">
                        Your message will be sent to the support team.
                    </p>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
