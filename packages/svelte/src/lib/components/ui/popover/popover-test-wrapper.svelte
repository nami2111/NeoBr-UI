<script lang="ts">
    import Popover from "./popover.svelte";

    let { class: className = undefined }: { class?: string } = $props();
</script>

<Popover class={className}>
    {#snippet trigger()}
        Open Popover
    {/snippet}
    Popover content
</Popover>
