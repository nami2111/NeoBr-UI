<script lang="ts">
    import Popover from "./popover.svelte";
    import { Button } from "../button";

    let { class: className = undefined }: { class?: string } = $props();
</script>

<Popover class={className}>
    {#snippet trigger(props)}
        <Button variant="outline" {...props}>Open Popover</Button>
    {/snippet}
    Popover content
</Popover>
