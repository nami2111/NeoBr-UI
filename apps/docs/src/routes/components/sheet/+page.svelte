<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Sheet, Button, Input, Label, Separator } from "@neobr/svelte";

    let open = $state(false);
    let openLeft = $state(false);

    const usage = `<Button onclick={() => open = true}>Open Sheet</Button>

<Sheet bind:open title="Edit Profile">
    <div class="grid gap-4 py-4">
        <p class="text-sm font-medium italic">Make changes to your profile here. Click save when you're done.</p>
        <!-- Form elements -->
    </div>
    <Separator class="my-4" />
    <div class="space-y-4">
        <div class="grid gap-2">
            <Label for="name-sheet">Name</Label>
            <Input id="name-sheet" value="Pedro Duarte" />
        </div>
        <div class="grid gap-2">
            <Label for="username-sheet">Username</Label>
            <Input id="username-sheet" value="@peduarte" />
        </div>
    </div>
    <div class="flex justify-end gap-3 mt-8">
        <Button onclick={() => open = false}>Save Changes</Button>
    </div>
</Sheet>`;
</script>

<DocPage
    title="Sheet"
    description="Extends the Dialog component to display content that complements the main content of the screen."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex flex-wrap items-center justify-center gap-4 py-10">
                    <Button onclick={() => (open = true)}>Open Right Sheet</Button>
                    <Button variant="outline" onclick={() => (openLeft = true)}
                        >Open Left Sheet</Button
                    >

                    <Sheet bind:open title="Edit Profile">
                        <div class="flex h-full flex-col gap-6 py-6">
                            <p
                                class="text-muted-foreground border-primary border-l-4 py-1 pl-4 text-sm font-medium italic"
                            >
                                Make changes to your profile here. Click save when you're done.
                            </p>
                            <div class="space-y-6">
                                <div class="grid gap-3">
                                    <Label
                                        for="name-demo"
                                        class="text-xs font-black tracking-tighter uppercase"
                                        >Full Name</Label
                                    >
                                    <Input id="name-demo" value="Pedro Duarte" />
                                </div>
                                <div class="grid gap-3">
                                    <Label
                                        for="username-demo"
                                        class="text-xs font-black tracking-tighter uppercase"
                                        >Username</Label
                                    >
                                    <Input id="username-demo" value="@peduarte" />
                                </div>
                            </div>
                            <Separator class="mt-auto" />
                            <div class="flex justify-end">
                                <Button class="w-full" onclick={() => (open = false)}
                                    >Save Changes</Button
                                >
                            </div>
                        </div>
                    </Sheet>

                    <Sheet bind:open={openLeft} side="left" title="Navigation">
                        <div class="flex flex-col gap-4 py-6">
                            <Button
                                variant="ghost"
                                class="justify-start text-lg font-black tracking-tighter uppercase"
                                >Home</Button
                            >
                            <Button
                                variant="ghost"
                                class="justify-start text-lg font-black tracking-tighter uppercase"
                                >Components</Button
                            >
                            <Button
                                variant="ghost"
                                class="justify-start text-lg font-black tracking-tighter uppercase"
                                >Documentation</Button
                            >
                            <Button
                                variant="ghost"
                                class="justify-start text-lg font-black tracking-tighter uppercase"
                                >GitHub</Button
                            >
                        </div>
                    </Sheet>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
