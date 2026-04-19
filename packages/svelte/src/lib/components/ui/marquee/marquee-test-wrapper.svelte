<script lang="ts">
    import Marquee from "./marquee.svelte";

    let {
        direction = "left",
        speed = 20,
        gap = "1rem",
        class: className = undefined,
    }: {
        direction?: "left" | "right";
        speed?: number;
        gap?: string;
        class?: string;
    } = $props();
</script>

<Marquee {direction} {speed} {gap} class={className}>
    Scrolling text
</Marquee>
