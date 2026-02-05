<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Collapsible,
        CollapsibleTrigger,
        CollapsibleContent,
        Button,
        Card,
        Icon,
    } from "@neobr/svelte";
    import { SquareArrowExpand01Icon, SquareArrowShrink01Icon } from "@hugeicons/core-free-icons";

    let open = $state(false);

    const usage = `<Collapsible bind:open>
    <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-bold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger>
            <Button variant="ghost" size="sm" class="w-9 p-0">
                <Icon icon={open ? SquareArrowShrink01Icon : SquareArrowExpand01Icon} class="h-4 w-4" />
                <span class="sr-only">Toggle</span>
            </Button>
        </CollapsibleTrigger>
    </div>
    <div class="rounded-brutalist border-2 border-foreground bg-background my-2 px-4 py-3 font-mono text-sm shadow-brutalist">
        @radix-ui/primitives
    </div>
    <CollapsibleContent class="space-y-2">
        <div class="rounded-brutalist border-2 border-foreground bg-background px-4 py-3 font-mono text-sm shadow-brutalist">
            @radix-ui/colors
        </div>
        <div class="rounded-brutalist border-2 border-foreground bg-background px-4 py-3 font-mono text-sm shadow-brutalist">
            @stitches/react
        </div>
    </CollapsibleContent>
</Collapsible>`;
</script>

<DocPage
    title="Collapsible"
    description="An interactive component which expands/collapses a panel."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Collapsible bind:open class="w-[350px] space-y-2">
                    <div class="flex items-center justify-between space-x-4 px-4">
                        <h4 class="text-sm font-black tracking-tighter uppercase">
                            @peduarte starred 3 repositories
                        </h4>
                        <CollapsibleTrigger>
                            <Button variant="outline" size="sm" class="h-8 w-8 p-0">
                                <Icon
                                    icon={open ? SquareArrowShrink01Icon : SquareArrowExpand01Icon}
                                    class="h-4 w-4"
                                />
                                <span class="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div
                        class="rounded-brutalist border-foreground bg-background shadow-brutalist border-2 px-4 py-2 font-mono text-sm"
                    >
                        @neobr/svelte
                    </div>
                    <CollapsibleContent class="space-y-2">
                        <div
                            class="rounded-brutalist border-foreground bg-background shadow-brutalist border-2 px-4 py-2 font-mono text-sm"
                        >
                            @neobr/cli
                        </div>
                        <div
                            class="rounded-brutalist border-foreground bg-background shadow-brutalist border-2 px-4 py-2 font-mono text-sm"
                        >
                            @neobr/tailwind-preset
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CodePreview>
        </section>
    </div>
</DocPage>
