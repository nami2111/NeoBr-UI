<script lang="ts">
    import { cn } from "../../../utils";
    import { fly, fade } from "svelte/transition";
    import { tick } from "svelte";

    type Props = {
        open?: boolean;
        onClose?: () => void;
        title?: string;
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

    const sizeClasses = {
        sm: "max-w-sm max-h-[80vh]",
        md: "max-w-lg max-h-[85vh]",
        lg: "max-w-2xl max-h-[90vh]",
        xl: "max-w-4xl max-h-[90vh]",
        full: "max-w-[95vw] max-h-[95vh]",
        auto: "max-w-[95vw] max-h-[95vh]",
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
        if (!open) return;

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
        if (open) {
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
        } else if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
    >
        <!-- Backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="bg-foreground/30 fixed inset-0 backdrop-blur-sm"
            transition:fade={{ duration: 200 }}
            onclick={handleClose}
        ></div>

        <!-- Modal Content -->
        <div
            bind:this={modalContent}
            class={cn(
                "card-brutalist relative z-50 w-full overflow-auto p-6 outline-none",
                sizeClasses[size],
            )}
            transition:fly={{ y: 20, duration: 300 }}
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
                        class="btn-brutalist hover:bg-accent rounded-[var(--brutalist-radius)] p-1 transition-all"
                        onclick={handleClose}
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="pt-4">
                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
{/if}
