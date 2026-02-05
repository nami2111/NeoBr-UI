<script lang="ts">
    import { getContext } from "svelte";
    import { slide } from "svelte/transition";
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();

    const root = getContext<{
        activeValues: string[];
    }>("accordion");
    const item = getContext<{ value: string }>("accordion-item");

    if (!root || !item) {
        throw new Error("AccordionContent must be used within AccordionItem and Accordion");
    }

    let isOpen = $derived(root.activeValues.includes(item.value));
</script>

{#if isOpen}
    <div
        class={cn("overflow-hidden px-4 pt-0 pb-4 text-sm font-medium", className)}
        transition:slide={{ duration: 200 }}
        data-state={isOpen ? "open" : "closed"}
        {...rest}
    >
        {@render children?.()}
    </div>
{/if}
