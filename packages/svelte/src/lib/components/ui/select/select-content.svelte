<script lang="ts">
    import { getContext } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();

    const ctx = getContext<any>("select");

    // Close on click outside
    function handleOutsideClick(e: MouseEvent) {
        if (ctx.open && ctx.triggerElement && !ctx.triggerElement.contains(e.target)) {
            ctx.open = false;
        }
    }
</script>

<svelte:window onclick={handleOutsideClick} />

{#if ctx.open}
    <div
        class={cn(
            "card-brutalist text-foreground animate-in fade-in-0 zoom-in-95 absolute top-[calc(100%+8px)] left-0 z-50 min-w-[8rem] overflow-hidden p-1",
            className,
        )}
        role="listbox"
        transition:fly={{ y: 5, duration: 150 }}
        style="width: {ctx.triggerElement?.offsetWidth}px"
        {...rest}
    >
        <div class="max-h-60 overflow-y-auto">
            {@render children?.()}
        </div>
    </div>
{/if}
