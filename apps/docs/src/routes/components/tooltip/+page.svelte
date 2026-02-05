<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Tooltip, Button } from "@neobr/svelte";

    const usage = `<Tooltip content="Add to library">
    <Button variant="outline">Hover me</Button>
</Tooltip>`;

    const positions = `<div class="flex gap-4">
    <Tooltip content="Tooltip top" position="top">
        <Button variant="outline">Top</Button>
    </Tooltip>
    <Tooltip content="Tooltip bottom" position="bottom">
        <Button variant="outline">Bottom</Button>
    </Tooltip>
    <Tooltip content="Tooltip left" position="left">
        <Button variant="outline">Left</Button>
    </Tooltip>
    <Tooltip content="Tooltip right" position="right">
        <Button variant="outline">Right</Button>
    </Tooltip>
</div>`;
</script>

<DocPage
    title="Tooltip"
    description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="flex items-center justify-center py-10">
                    <Tooltip content="Add to library">
                        <Button variant="outline">Hover me</Button>
                    </Tooltip>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Positions</h2>
            <CodePreview code={positions}>
                <div class="flex flex-wrap items-center justify-center gap-6 py-10">
                    <Tooltip content="Tooltip top" position="top">
                        <Button variant="outline" size="sm">Top</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip bottom" position="bottom">
                        <Button variant="outline" size="sm">Bottom</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip left" position="left">
                        <Button variant="outline" size="sm">Left</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip right" position="right">
                        <Button variant="outline" size="sm">Right</Button>
                    </Tooltip>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
