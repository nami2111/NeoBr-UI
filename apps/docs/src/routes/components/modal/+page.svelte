<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Modal, Button } from "@neobr/svelte";

    let open = $state(false);
    let openSmall = $state(false);
    let openLarge = $state(false);
    let openAuto = $state(false);
    let openFull = $state(false);

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

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Sizes</h2>
            <p class="text-muted-foreground text-sm">
                Control the modal size with the <code class="bg-muted rounded px-1.5 py-0.5"
                    >size</code
                >
                prop. Available options: <code class="bg-muted rounded px-1.5 py-0.5">sm</code>,
                <code class="bg-muted rounded px-1.5 py-0.5">md</code> (default),
                <code class="bg-muted rounded px-1.5 py-0.5">lg</code>,
                <code class="bg-muted rounded px-1.5 py-0.5">xl</code>,
                <code class="bg-muted rounded px-1.5 py-0.5">full</code>,
                <code class="bg-muted rounded px-1.5 py-0.5">auto</code>.
                Every preset keeps <code class="bg-muted rounded px-1.5 py-0.5">w-full</code>
                viewport bounds, so larger modals shrink instead of overflowing narrow screens.
            </p>

            <div class="flex flex-wrap gap-3">
                <Button onclick={() => (openSmall = true)} size="sm">Small Modal</Button>
                <Button onclick={() => (openLarge = true)} size="sm">Large Modal</Button>
                <Button onclick={() => (openAuto = true)} size="sm">Auto Modal</Button>
                <Button onclick={() => (openFull = true)} size="sm">Full Modal</Button>
            </div>

            <!-- Small Modal -->
            <Modal bind:open={openSmall} title="Small Modal" size="sm">
                <p class="text-sm">This is a compact modal perfect for simple confirmations.</p>
                <div class="mt-4 flex justify-end gap-3">
                    <Button size="sm" onclick={() => (openSmall = false)}>Close</Button>
                </div>
            </Modal>

            <!-- Large Modal -->
            <Modal bind:open={openLarge} title="Large Modal" size="lg">
                <div class="space-y-4">
                    <p class="text-sm">
                        This modal has more horizontal space for wider content like forms or tables.
                    </p>
                    <div class="border-foreground bg-muted space-y-2 border-2 p-4">
                        <p class="text-sm font-bold">Example Content:</p>
                        <p class="text-sm">
                            Wide content can be displayed comfortably without wrapping
                            unnecessarily.
                        </p>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <Button size="sm" onclick={() => (openLarge = false)}>Close</Button>
                </div>
            </Modal>

            <!-- Auto Modal -->
            <Modal bind:open={openAuto} title="Auto-Sized Modal" size="auto">
                <div class="space-y-4">
                    <p class="text-sm">
                        This modal adapts to its content size while respecting viewport boundaries.
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="border-foreground bg-muted border-2 p-3">
                            <p class="text-xs font-bold">Column 1</p>
                        </div>
                        <div class="border-foreground bg-muted border-2 p-3">
                            <p class="text-xs font-bold">Column 2</p>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <Button size="sm" onclick={() => (openAuto = false)}>Close</Button>
                </div>
            </Modal>

            <!-- Full Modal -->
            <Modal bind:open={openFull} title="Full-Screen Modal" size="full">
                <div class="space-y-4">
                    <p class="text-sm">
                        This modal uses most of the viewport for maximum content space.
                    </p>
                    <div
                        class="border-foreground bg-muted flex min-h-[300px] items-center justify-center border-2 p-6"
                    >
                        <p class="text-muted-foreground text-sm">Large content area</p>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <Button size="sm" onclick={() => (openFull = false)}>Close</Button>
                </div>
            </Modal>
        </section>
    </div>
</DocPage>
