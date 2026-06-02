<script lang="ts">
    import { cn } from "../../../utils";
    import { TRANSITION_BRUTALIST_FAST } from "../../../utils/motion";
    import { useDismissableOverlay } from "../../../utils/overlay.svelte";
    import { fade } from "svelte/transition";

    type Props = {
        open?: boolean;
        trigger?: import("svelte").Snippet;
        children?: import("svelte").Snippet;
        class?: string;
        contentClass?: string;
    };

    let {
        open = $bindable(false),
        trigger,
        children,
        class: className,
        contentClass,
    }: Props = $props();

    function toggle() {
        open = !open;
    }

    function close() {
        open = false;
    }

    const overlay = useDismissableOverlay({
        open: () => open,
        close,
    });
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

<div class={cn("relative inline-block text-left", className)}>
    <button
        type="button"
        onclick={toggle}
        class="cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={open}
    >
        {@render trigger?.()}
    </button>

    {#if open}
        <div
            class={cn(
                "border-foreground bg-background shadow-brutalist rounded-brutalist absolute mt-2 min-w-[200px] border-2 p-4",
                contentClass,
            )}
            style="z-index: var(--z-popover)"
            transition:fade={TRANSITION_BRUTALIST_FAST}
            role="dialog"
        >
            {@render children?.()}
        </div>
        <div
            class="fixed inset-0"
            style="z-index: var(--z-popover-backdrop)"
            onclick={close}
            role="presentation"
        ></div>
    {/if}
</div>
