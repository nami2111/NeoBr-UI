<script lang="ts">
    import { cn } from "../../../utils";
    import { fly, fade } from "svelte/transition";
    import { tick } from "svelte";

    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        open?: boolean;
        onClose?: () => void;
        side?: "left" | "right" | "top" | "bottom";
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

    let sheetContent = $state<HTMLElement>();
    let previousFocus: HTMLElement | null = null;

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
            if (!sheetContent) return;
            const focusable = getFocusableElements(sheetContent);
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
                if (sheetContent) {
                    const focusable = getFocusableElements(sheetContent);
                    if (focusable.length > 0) {
                        focusable[0].focus();
                    } else {
                        sheetContent.focus();
                    }
                }
            });
        } else if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    });

    const flyParams = $derived.by(() => {
        switch (side) {
            case "top":
                return { y: -200, duration: 300 };
            case "bottom":
                return { y: 200, duration: 300 };
            case "left":
                return { x: -200, duration: 300 };
            case "right":
                return { x: 200, duration: 300 };
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

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div
            class="bg-foreground/30 fixed inset-0 backdrop-blur-sm transition-opacity"
            transition:fade={{ duration: 200 }}
            onclick={handleClose}
            role="presentation"
        ></div>

        <!-- Sheet Content -->
        <div
            bind:this={sheetContent}
            class={cn(
                "bg-background shadow-brutalist border-foreground fixed z-50 flex flex-col gap-4 p-6 transition-all outline-none",
                sideClasses,
                className,
            )}
            transition:fly={flyParams}
            role="dialog"
            aria-modal="true"
            tabindex="-1"
            {...rest}
        >
            <div class="flex items-center justify-between">
                {#if title}
                    <h2 class="text-xl font-extrabold tracking-tight uppercase">{title}</h2>
                {/if}
                <button
                    type="button"
                    class="border-foreground hover:bg-muted rounded-brutalist border-2 p-1 transition-all active:translate-y-[2px]"
                    onclick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span class="sr-only">Close</span>
                </button>
            </div>

            <div class="relative flex-1 overflow-y-auto">
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}
