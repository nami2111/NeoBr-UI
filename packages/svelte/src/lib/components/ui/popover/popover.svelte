<script lang="ts">
    import { cn } from "../../../utils";
    import { TRANSITION_BRUTALIST_FAST } from "../../../utils/motion";
    import { useOverlayController } from "../../../utils/overlay.svelte";
    import { fade } from "svelte/transition";
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type TriggerProps = Pick<
        HTMLButtonAttributes,
        "onclick" | "aria-haspopup" | "aria-expanded"
    >;

    type Props = {
        open?: boolean;
        trigger?: Snippet<[TriggerProps]>;
        children?: Snippet;
        class?: string;
        contentClass?: string;
        contentLabel?: string;
    };

    let {
        open = $bindable(false),
        trigger,
        children,
        class: className,
        contentClass,
        contentLabel = "Popover content",
    }: Props = $props();

    function toggle() {
        open = !open;
    }

    const triggerProps = $derived({
        onclick: toggle,
        "aria-haspopup": "dialog" as const,
        "aria-expanded": open,
    });

    function close() {
        open = false;
    }

    const overlay = useOverlayController({
        open: () => open,
        close,
        trapFocus: false,
    });
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

<div class={cn("relative inline-block text-left", className)}>
    {@render trigger?.(triggerProps)}

    {#if open}
        <div
            {@attach overlay.content}
            class={cn(
                "border-foreground bg-background shadow-brutalist rounded-brutalist absolute mt-2 min-w-[200px] border-2 p-4",
                contentClass,
            )}
            style="z-index: var(--z-popover)"
            transition:fade={TRANSITION_BRUTALIST_FAST}
            role="dialog"
            aria-label={contentLabel}
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
