<script lang="ts">
    import { cn } from "../../../utils";
    import { isBrowser } from "../../../utils/browser";
    import { TRANSITION_BRUTALIST_FAST } from "../../../utils/motion";
    import { useDismissableOverlay } from "../../../utils/overlay.svelte";
    import { fade } from "svelte/transition";

    type Props = {
        open?: boolean;
        trigger?: import("svelte").Snippet;
        children?: import("svelte").Snippet;
    };

    let { open = $bindable(false), trigger, children }: Props = $props();

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

    function handleKeydown(e: KeyboardEvent) {
        overlay.handleKeydown(e);
        if (!isBrowser || !open || !overlay.isTopOverlay()) return;

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.stopImmediatePropagation();
            e.preventDefault();
            const menuContent = overlay.getContentElement();
            if (!menuContent) return;
            const items = Array.from(
                menuContent.querySelectorAll('[role="menuitem"]:not([data-disabled="true"])'),
            ) as HTMLElement[];
            if (items.length === 0) return;

            const currentIndex = items.indexOf(document.activeElement as HTMLElement);
            let nextIndex: number;

            if (e.key === "ArrowDown") {
                nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            }

            items[nextIndex].focus();
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative inline-block text-left">
    <button
        type="button"
        onclick={toggle}
        class="cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
    >
        {@render trigger?.()}
    </button>

    {#if open}
        <div
            {@attach overlay.content}
            class="border-foreground bg-background shadow-brutalist rounded-brutalist absolute right-0 mt-2 w-56 origin-top-right border-2 focus:outline-none"
            style="z-index: var(--z-dropdown)"
            transition:fade={TRANSITION_BRUTALIST_FAST}
            role="menu"
            aria-orientation="vertical"
        >
            <div class="py-1" onclick={close} role="none">
                {@render children?.()}
            </div>
        </div>
        <div
            class="fixed inset-0"
            style="z-index: var(--z-dropdown-backdrop)"
            onclick={close}
            role="presentation"
        ></div>
    {/if}
</div>
