<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Popover, Button, Input, Label } from "@neobr/svelte";

    const usage = `<Popover>
    {#snippet trigger(props)}
        <Button variant="outline" {...props}>Open Popover</Button>
    {/snippet}
    <div class="grid gap-4">
        <div class="space-y-2">
            <h4 class="font-bold leading-none tracking-tighter uppercase">Dimensions</h4>
            <p class="text-xs text-muted-foreground font-medium italic">
                Set the dimensions for the layer.
            </p>
        </div>
        <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="width">Width</Label>
                <Input id="width" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxWidth">Max. width</Label>
                <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="height">Height</Label>
                <Input id="height" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxHeight">Max. height</Label>
                <Input id="maxHeight" value="none" class="col-span-2 h-8" />
            </div>
        </div>
    </div>
</Popover>`;
</script>

<DocPage title="Popover" description="Displays rich content in a portal, triggered by a button.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage} class="min-h-[600px]">
                <div class="flex items-center justify-center py-10">
                    <Popover>
                        {#snippet trigger(props)}
                            <Button variant="outline" {...props}>Open Popover</Button>
                        {/snippet}
                        <div class="grid w-[280px] gap-4">
                            <div class="space-y-2">
                                <h4
                                    class="border-foreground border-b-2 pb-1 leading-none font-black tracking-tighter uppercase"
                                >
                                    Dimensions
                                </h4>
                                <p class="text-muted-foreground text-xs font-medium italic">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div class="grid gap-3">
                                <div class="grid grid-cols-3 items-center gap-4">
                                    <Label for="width-demo" class="text-xs font-bold uppercase"
                                        >Width</Label
                                    >
                                    <Input
                                        id="width-demo"
                                        value="100%"
                                        class="col-span-2 h-8 text-xs"
                                    />
                                </div>
                                <div class="grid grid-cols-3 items-center gap-4">
                                    <Label for="maxWidth-demo" class="text-xs font-bold uppercase"
                                        >Max. width</Label
                                    >
                                    <Input
                                        id="maxWidth-demo"
                                        value="300px"
                                        class="col-span-2 h-8 text-xs"
                                    />
                                </div>
                                <div class="grid grid-cols-3 items-center gap-4">
                                    <Label for="height-demo" class="text-xs font-bold uppercase"
                                        >Height</Label
                                    >
                                    <Input
                                        id="height-demo"
                                        value="25px"
                                        class="col-span-2 h-8 text-xs"
                                    />
                                </div>
                                <div class="grid grid-cols-3 items-center gap-4">
                                    <Label for="maxHeight-demo" class="text-xs font-bold uppercase"
                                        >Max. height</Label
                                    >
                                    <Input
                                        id="maxHeight-demo"
                                        value="none"
                                        class="col-span-2 h-8 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </Popover>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
