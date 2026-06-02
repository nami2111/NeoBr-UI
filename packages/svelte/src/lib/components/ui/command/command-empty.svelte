<script lang="ts">
    import { getCommandState } from "./command-context";
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();

    const state = getCommandState();
    let shouldRender = $derived(
        Boolean(state?.search.trim()) && (state?.visibleCount ?? 0) === 0,
    );
</script>

{#if shouldRender}
    <div class={cn("py-6 text-center text-sm", className)} {...rest}>
        {#if children}
            {@render children()}
        {:else}
            No results found.
        {/if}
    </div>
{/if}
