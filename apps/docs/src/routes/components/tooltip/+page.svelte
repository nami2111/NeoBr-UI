<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Tooltip } from "@neobr/svelte";

    const usage = `<Tooltip content="Add to library">
    <span class="...">Hover me</span>
</Tooltip>`;

    const positions = `<div class="flex gap-4">
    <Tooltip content="Tooltip top" position="top">
        <span class="...">Top</span>
    </Tooltip>
    <Tooltip content="Tooltip bottom" position="bottom">
        <span class="...">Bottom</span>
    </Tooltip>
    <Tooltip content="Tooltip left" position="left">
        <span class="...">Left</span>
    </Tooltip>
    <Tooltip content="Tooltip right" position="right">
        <span class="...">Right</span>
    </Tooltip>
</div>`;

    const triggerClass =
        "border-foreground shadow-brutalist hover:shadow-brutalist-hover tracking-brutalist inline-flex h-10 items-center justify-center rounded-brutalist border-2 bg-background px-4 py-2 text-sm font-bold whitespace-nowrap transition-all hover:-translate-y-[var(--lift-brutalist)] hover:bg-accent active:translate-y-[var(--press-brutalist)] active:shadow-none";
    const smallTriggerClass =
        "border-foreground shadow-brutalist hover:shadow-brutalist-hover tracking-brutalist inline-flex h-9 items-center justify-center rounded-brutalist border-2 bg-background px-3 text-sm font-bold whitespace-nowrap transition-all hover:-translate-y-[var(--lift-brutalist)] hover:bg-accent active:translate-y-[var(--press-brutalist)] active:shadow-none";
</script>

<DocPage
    title="Tooltip"
    description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage} class="min-h-[450px]">
                <div class="flex items-center justify-center py-10">
                    <Tooltip content="Add to library">
                        <span class={triggerClass}>Hover me</span>
                    </Tooltip>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Positions</h2>
            <CodePreview code={positions} class="min-h-[300px]">
                <div class="flex flex-wrap items-center justify-center gap-6 py-10">
                    <Tooltip content="Tooltip top" position="top">
                        <span class={smallTriggerClass}>Top</span>
                    </Tooltip>
                    <Tooltip content="Tooltip bottom" position="bottom">
                        <span class={smallTriggerClass}>Bottom</span>
                    </Tooltip>
                    <Tooltip content="Tooltip left" position="left">
                        <span class={smallTriggerClass}>Left</span>
                    </Tooltip>
                    <Tooltip content="Tooltip right" position="right">
                        <span class={smallTriggerClass}>Right</span>
                    </Tooltip>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
