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
    import { isBrowser } from "../../../utils/browser";
    import { useScrollLock } from "../../../utils/scroll-lock.svelte";
    import { TRANSITION_BRUTALIST_SLOW } from "../../../utils/motion";
    import { fly, fade } from "svelte/transition";
    import { tick } from "svelte";
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

    let modalContent = $state<HTMLElement>();
    let previousFocus: HTMLElement | null = null;
    const { lock: scrollLock, unlock: scrollUnlock } = useScrollLock();

    const sizeClasses = {
        sm: "min-w-[320px] max-w-sm min-h-[200px] max-h-[80vh]",
        md: "min-w-[400px] max-w-lg min-h-[300px] max-h-[85vh]",
        lg: "min-w-[600px] max-w-2xl min-h-[400px] max-h-[90vh]",
        xl: "min-w-[800px] max-w-4xl min-h-[500px] max-h-[90vh]",
        full: "min-w-[95vw] max-w-[95vw] min-h-[95vh] max-h-[95vh]",
        auto: "w-auto h-auto max-w-[95vw] max-h-[95vh]",
    };

    function handleClose() {
        open = false;
        onClose?.();
    }

    function getFocusableElements(element: HTMLElement): HTMLElement[] {
        return Array.from(
            element.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
            ),
        ) as HTMLElement[];
    }

    function handleKeydown(e: KeyboardEvent) {
        if (!isBrowser || !open) return;

        if (e.key === "Escape") {
            e.preventDefault();
            handleClose();
            return;
        }

        if (e.key === "Tab") {
            if (!modalContent) return;
            const focusable = getFocusableElements(modalContent);
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }

    $effect(() => {
        if (!isBrowser) return;

        if (open) {
            scrollLock();
            previousFocus = document.activeElement as HTMLElement;
            tick().then(() => {
                if (modalContent) {
                    const focusable = getFocusableElements(modalContent);
                    if (focusable.length > 0) {
                        focusable[0].focus();
                    } else {
                        modalContent.focus();
                    }
                }
            });
        } else {
            scrollUnlock();
            if (previousFocus) {
                previousFocus.focus();
                previousFocus = null;
            }
        }

        return () => {
            scrollUnlock();
            if (previousFocus) {
                previousFocus.focus();
                previousFocus = null;
            }
        };
    });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <div
        class="fixed inset-0 flex items-center justify-center p-4"
        style="z-index: var(--z-modal)"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
    >
        <!-- Backdrop -->
        <div
            class="bg-foreground/30 fixed inset-0 backdrop-blur-sm"
            style="z-index: var(--z-modal-backdrop)"
            transition:fade={{ duration: 200 }}
            onclick={handleClose}
            onkeydown={(e) => e.key === "Enter" && handleClose()}
            role="button"
            tabindex="-1"
            aria-label="Close modal backdrop"
        ></div>

        <!-- Modal Content -->
        <div
            bind:this={modalContent}
            class={cn(
                "card-brutalist relative w-full overflow-auto p-6 outline-none",
                sizeClasses[size],
            )}
            style="z-index: var(--z-modal)"
            transition:fly={{ y: 20, ...TRANSITION_BRUTALIST_SLOW }}
            tabindex="-1"
        >
            <div class="flex flex-col space-y-2">
                <div class="flex items-center justify-between">
                    {#if title}
                        <h2 id="modal-title" class="text-lg font-bold tracking-tight">
                            {title}
                        </h2>
                    {/if}
                    <button
                        class="btn-brutalist hover:bg-accent rounded-brutalist p-1 transition-all"
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
