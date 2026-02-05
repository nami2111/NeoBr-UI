<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("py-6 text-center text-sm", className)} {...rest}>
    {#if children}
        {@render children()}
    {:else}
        No results found.
    {/if}
</div>
