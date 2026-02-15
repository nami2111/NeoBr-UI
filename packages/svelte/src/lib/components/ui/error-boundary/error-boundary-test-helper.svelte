<script lang="ts">
    import { onMount } from "svelte";

    let { shouldThrow = false }: { shouldThrow?: boolean } = $props();
</script>

<div>
    {#if shouldThrow}
        {(() => {
            throw new Error("Test Error");
        })()}
    {/if}
    Safe Content
</div>
