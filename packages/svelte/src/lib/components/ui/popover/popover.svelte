<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";
    import { TRANSITION_POPUP } from "../../../utils/motion";
    import { useOverlayController } from "../../../utils/overlay.svelte";
    import { fly } from "svelte/transition";
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type TriggerProps = Pick<
        HTMLButtonAttributes,
        "onclick" | "aria-haspopup" | "aria-expanded"
    >;

    type Props = {
        /** Controls visibility. Bindable. */
        open?: boolean;
        /** Trigger snippet; receives props to spread onto your trigger element. */
        trigger?: Snippet<[TriggerProps]>;
        /** Popover content. */
        children?: Snippet;
        /** Additional classes for the root. */
        class?: string;
        /** Additional classes for the content panel. */
        contentClass?: string;
        /** Accessible label for the content panel. */
        contentLabel?: string;
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    };

    let {
        open = $bindable(false),
        trigger,
        children,
        class: className,
        contentClass,
        contentLabel = "Popover content",
        radius = "brutalist",
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
                "z-popover border-foreground bg-background shadow-brutalist absolute mt-2 min-w-[200px] border-2 p-4",
                RADIUS[radius],
                contentClass,
            )}
            transition:fly={TRANSITION_POPUP()}
            role="dialog"
            aria-label={contentLabel}
        >
            {@render children?.()}
        </div>
        <div
            class="z-popover-backdrop fixed inset-0"
            onclick={close}
            role="presentation"
        ></div>
    {/if}
</div>
