<script lang="ts">
    import BentoGrid from "./bento-grid.svelte";
    import BentoGridItem from "./bento-grid-item.svelte";

    let { gridClass = undefined }: { gridClass?: string } = $props();
</script>

<BentoGrid class={gridClass}>
    <BentoGridItem title="Test Item" description="Test description" />
    <BentoGridItem title="Second Item" description="Second description" />
</BentoGrid>
