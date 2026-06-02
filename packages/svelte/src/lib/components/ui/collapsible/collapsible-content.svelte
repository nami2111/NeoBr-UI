<script lang="ts">
    import { getCollapsibleState } from "./collapsible-context";
    import { cn } from "../../../utils";
    import { slide } from "svelte/transition";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        transition?: boolean;
    };

    let {
        class: className,
        children,
        transition = true,
        ...rest
    }: Props = $props();
    const state = getCollapsibleState();
</script>

{#if state?.open}
    <div
        class={cn("overflow-hidden", className)}
        data-state={state?.open ? "open" : "closed"}
        transition:slide={{ duration: 300 }}
        {...rest}
    >
        {@render children?.()}
    </div>
{/if}
