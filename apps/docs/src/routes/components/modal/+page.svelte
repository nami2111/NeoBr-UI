<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Modal, Button } from "@neobr/svelte";

    let open = $state(false);

    const usage = `<Button onclick={() => open = true}>Open Modal</Button>

<Modal bind:open title="Edit Profile">
    <div class="grid gap-4 py-4">
        <p class="text-sm font-medium italic">Make changes to your profile here. Click save when you're done.</p>
        <!-- Form elements would go here -->
    </div>
    <div class="flex justify-end gap-3 mt-4">
        <Button variant="outline" onclick={() => open = false}>Cancel</Button>
        <Button onclick={() => open = false}>Save Changes</Button>
    </div>
</Modal>`;
</script>

<DocPage
    title="Modal"
    description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex items-center justify-center py-10">
                    <Button onclick={() => (open = true)}>Open Modal</Button>

                    <Modal bind:open title="Edit Profile">
                        <div class="grid gap-4 py-4">
                            <p
                                class="text-muted-foreground border-primary border-l-2 py-1 pl-4 text-sm font-medium italic"
                            >
                                Make changes to your profile here. Click save when you're done.
                            </p>
                            <div class="mt-4 space-y-4">
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-black tracking-tighter uppercase"
                                        for="name">Name</label
                                    >
                                    <div
                                        class="border-foreground bg-muted rounded-none border-2 p-2 font-mono text-sm"
                                    >
                                        Pedro Duarte
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-sm font-black tracking-tighter uppercase"
                                        for="username">Username</label
                                    >
                                    <div
                                        class="border-foreground bg-muted rounded-none border-2 p-2 font-mono text-sm"
                                    >
                                        @peduarte
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end gap-4">
                            <Button variant="outline" size="sm" onclick={() => (open = false)}
                                >Cancel</Button
                            >
                            <Button size="sm" onclick={() => (open = false)}>Save Changes</Button>
                        </div>
                    </Modal>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
