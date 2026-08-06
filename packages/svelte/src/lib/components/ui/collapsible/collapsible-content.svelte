<script lang="ts">
    import { getCollapsibleState } from "./collapsible-context";
    import { cn } from "../../../utils";
    import { TRANSITION_BRUTALIST_SLOW } from "../../../utils/motion";
    import { slide } from "svelte/transition";

    type Props = {
        /** Additional classes for the content wrapper. */
        class?: string;
        /** Collapsible content. */
        children?: import("svelte").Snippet;
        /**
         * Animate open/close with a slide transition.
         * @default true
         */
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
        transition:slide={TRANSITION_BRUTALIST_SLOW()}
        {...rest}
    >
        {@render children?.()}
    </div>
{/if}
