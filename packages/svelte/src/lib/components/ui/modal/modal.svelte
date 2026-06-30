<script lang="ts">
    /**
     * A modal dialog component with backdrop, focus trapping, and keyboard navigation.
     * Supports various sizes and Neo-Brutalist styling.
     *
     * @example
     * ```svelte
     * <Modal bind:open={isOpen} title="Confirm Action" size="md">
     *   <p>Are you sure?</p>
     *   <Button onclick={() => isOpen = false}>Close</Button>
     * </Modal>
     * ```
     */
    import { cn } from "../../../utils";
    import {
        TRANSITION_BRUTALIST_BACKDROP,
        TRANSITION_BRUTALIST_SLOW,
    } from "../../../utils/motion";
    import { useOverlayController } from "../../../utils/overlay.svelte";
    import { fly, fade } from "svelte/transition";
    import Icon from "../icon/icon.svelte";
    import { Cancel01Icon } from "@hugeicons/core-free-icons";

    type Props = {
        /**
         * Whether the modal is open. Can be bound.
         * @default false
         */
        open?: boolean;

        /**
         * Callback fired when the modal requests to close (e.g. backdrop click, Escape key).
         * Not needed if you use `bind:open`.
         */
        onClose?: () => void;

        /**
         * Optional title for the modal header.
         */
        title?: string;

        /**
         * Size of the modal.
         * @default "md"
         */
        size?: "sm" | "md" | "lg" | "xl" | "full" | "auto";

        children?: import("svelte").Snippet;
    };

    let {
        open = $bindable(false),
        onClose = () => {},
        title = undefined,
        size = "md",
        children,
    }: Props = $props();

    const modalId = $props.id();
    let titleId = $derived(title ? `modal-title-${modalId}` : undefined);

    const sizeClasses = {
        sm: "max-w-sm min-h-[200px] max-h-[80vh]",
        md: "max-w-lg min-h-[300px] max-h-[85vh]",
        lg: "max-w-2xl min-h-[400px] max-h-[90vh]",
        xl: "max-w-4xl min-h-[500px] max-h-[90vh]",
        full: "w-[95vw] max-w-[95vw] min-h-[95vh] max-h-[95vh]",
        auto: "w-auto h-auto max-w-[95vw] max-h-[95vh]",
    };

    function handleClose() {
        open = false;
        onClose?.();
    }

    const overlay = useOverlayController({
        open: () => open,
        close: handleClose,
    });
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

{#if open}
    <div
        class="z-modal fixed inset-0 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
    >
        <!-- Backdrop -->
        <button
            type="button"
            class="z-modal-backdrop bg-foreground/30 fixed inset-0 border-0 p-0 backdrop-blur-sm"
            transition:fade={TRANSITION_BRUTALIST_BACKDROP}
            onclick={handleClose}
            tabindex="-1"
            aria-label="Close modal backdrop"
        ></button>

        <!-- Modal Content -->
        <div
            {@attach overlay.content}
            class={cn(
                "z-modal bg-card text-card-foreground border-foreground shadow-brutalist rounded-brutalist relative w-full overflow-auto border-2 p-6 outline-none",
                sizeClasses[size],
            )}
            transition:fly={{ y: 20, ...TRANSITION_BRUTALIST_SLOW }}
            tabindex="-1"
        >
            <div class="flex flex-col space-y-2">
                <div class="flex items-center justify-between">
                    {#if title}
                        <h2 id={titleId} class="text-lg font-bold tracking-tight">
                            {title}
                        </h2>
                    {/if}
                    <button
                        class="border-foreground shadow-brutalist hover:shadow-brutalist-hover hover:bg-accent rounded-brutalist cursor-pointer border-2 p-1 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none"
                        onclick={handleClose}
                        aria-label="Close modal"
                    >
                        <Icon icon={Cancel01Icon} class="h-4 w-4" />
                    </button>
                </div>
                <div class="pt-4">
                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
{/if}
