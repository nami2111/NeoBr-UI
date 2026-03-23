<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("py-6 text-center text-sm", className)} {...rest}>
    {#if children}
        {@render children()}
    {:else}
        No results found.
    {/if}
</div>
