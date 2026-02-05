<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Button, toast, Toaster } from "@neobr/svelte";

    const usage = `<script>
    import { toast, Toaster } from "@neobr/svelte";
<\/script>

<Toaster />

<Button onclick={() => toast.add({
    title: "Scheduled: Catch up",
    description: "Friday, February 10, 2023 at 5:57 PM",
})}>
    Add to calendar
</Button>`;

    const variants = `<Button onclick={() => toast.success("Event has been created")}>
    Success
</Button>
<Button onclick={() => toast.error("Something went wrong")}>
    Error
</Button>
<Button onclick={() => toast.warning("Check your connection")}>
    Warning
</Button>`;
</script>

<DocPage title="Toast" description="A succinct message that is displayed after an action.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <p class="mb-4 text-sm font-medium italic">
                Make sure to include the <code>&lt;Toaster /&gt;</code> component in your root layout.
            </p>
            <CodePreview code={usage}>
                <div class="flex items-center justify-center py-10">
                    <Button
                        onclick={() =>
                            toast.add({
                                title: "Scheduled: Catch up",
                                description: "Friday, February 15, 2026 at 5:57 PM",
                            })}
                    >
                        Add to calendar
                    </Button>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Variants</h2>
            <CodePreview code={variants}>
                <div class="flex flex-wrap items-center justify-center gap-4 py-10">
                    <Button onclick={() => toast.success("Event has been created")}>Success</Button>
                    <Button onclick={() => toast.error("Something went wrong")}>Error</Button>
                    <Button onclick={() => toast.warning("Check your connection")}>Warning</Button>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
