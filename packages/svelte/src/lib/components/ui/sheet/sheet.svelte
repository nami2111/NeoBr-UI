<script lang="ts">
    import { cn } from "../../../utils";
    import {
        TRANSITION_BRUTALIST_BACKDROP,
        TRANSITION_BRUTALIST_SLOW,
    } from "../../../utils/motion";
    import { useOverlayController } from "../../../utils/overlay.svelte";
    import { fly, fade } from "svelte/transition";
    import Icon from "../icon/icon.svelte";
    import { Cancel01Icon } from "@hugeicons/core-free-icons";

    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        /**
         * Whether the sheet is open. Bindable.
         * @default false
         */
        open?: boolean;
        /** Called when the sheet requests to close (backdrop click, Escape, close button). */
        onClose?: () => void;
        /**
         * Edge the sheet slides in from.
         * @default "right"
         */
        side?: "left" | "right" | "top" | "bottom";
        /** Optional title shown in the sheet header. */
        title?: string;
    };

    let {
        open = $bindable(false),
        onClose,
        side = "right",
        title,
        class: className,
        children,
        ...rest
    }: Props = $props();

    const sheetId = $props.id();
    let titleId = $derived(title ? `sheet-title-${sheetId}` : undefined);

    function handleClose() {
        open = false;
        onClose?.();
    }

    const overlay = useOverlayController({
        open: () => open,
        close: handleClose,
    });

    const flyParams = $derived.by(() => {
        switch (side) {
            case "top":
                return { y: -200, ...TRANSITION_BRUTALIST_SLOW() };
            case "bottom":
                return { y: 200, ...TRANSITION_BRUTALIST_SLOW() };
            case "left":
                return { x: -200, ...TRANSITION_BRUTALIST_SLOW() };
            case "right":
                return { x: 200, ...TRANSITION_BRUTALIST_SLOW() };
        }
    });

    const sideClasses = $derived.by(() => {
        switch (side) {
            case "top":
                return "inset-x-0 top-0 border-b-2 h-1/3";
            case "bottom":
                return "inset-x-0 bottom-0 border-t-2 h-1/3";
            case "left":
                return "inset-y-0 left-0 border-r-2 w-3/4 sm:max-w-sm";
            case "right":
                return "inset-y-0 right-0 border-l-2 w-3/4 sm:max-w-sm";
        }
    });
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

{#if open}
    <div class="z-sheet fixed inset-0 flex items-center justify-center">
        <!-- Backdrop -->
        <button
            type="button"
            class="z-sheet-backdrop bg-foreground/30 fixed inset-0 border-0 p-0 backdrop-blur-sm transition-opacity"
            transition:fade={TRANSITION_BRUTALIST_BACKDROP()}
            onclick={handleClose}
            tabindex="-1"
            aria-label="Close sheet backdrop"
        ></button>

        <!-- Sheet Content -->
        <div
            {@attach overlay.content}
            class={cn(
                "z-sheet bg-background shadow-brutalist border-foreground fixed flex flex-col gap-4 p-6 transition-all outline-none",
                sideClasses,
                className,
            )}
            transition:fly={flyParams}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabindex="-1"
            {...rest}
        >
            <div class="flex items-center justify-between">
                {#if title}
                    <h2 id={titleId} class="text-xl font-extrabold tracking-tight uppercase">
                        {title}
                    </h2>
                {/if}
                <button
                    type="button"
                    class="border-foreground hover:bg-muted rounded-brutalist border-2 p-1 transition-all active:translate-y-[var(--press-brutalist-sm)]"
                    onclick={handleClose}
                >
                    <Icon icon={Cancel01Icon} class="h-5 w-5" />
                    <span class="sr-only">Close</span>
                </button>
            </div>

            <div class="relative flex-1 overflow-y-auto">
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}
