<script lang="ts">
    import ScrollArea from "./scroll-area.svelte";

    let {
        orientation = "vertical",
        class: className = undefined,
    }: {
        orientation?: "vertical" | "horizontal" | "both";
        class?: string;
    } = $props();
</script>

<ScrollArea {orientation} class={className}>
    Scrollable content
</ScrollArea>
