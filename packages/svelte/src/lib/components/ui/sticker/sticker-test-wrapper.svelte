<script lang="ts">
    import Sticker from "./sticker.svelte";

    let {
        variant = "default",
        shape = "rectangle",
        rotation = undefined,
        class: className = undefined,
    }: {
        variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive";
        shape?: "rectangle" | "pill" | "circle" | "tape" | "jagged" | "star";
        rotation?: number;
        class?: string;
    } = $props();
</script>

<Sticker {variant} {shape} {rotation} class={className}>Sticker text</Sticker>
