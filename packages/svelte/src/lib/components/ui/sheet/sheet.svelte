<script lang="ts">
    import { cn } from "../../../utils";
    import { fly, fade } from "svelte/transition";

    type Props = {
        open?: boolean;
        onClose?: () => void;
        side?: "left" | "right" | "top" | "bottom";
        title?: string;
        class?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
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

    function handleClose() {
        open = false;
        onClose?.();
    }

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

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="bg-foreground/30 fixed inset-0 backdrop-blur-sm transition-opacity"
            transition:fade={{ duration: 200 }}
            onclick={handleClose}
        ></div>

        <!-- Sheet Content -->
        <div
            class={cn(
                "bg-background shadow-impact border-foreground fixed z-50 flex flex-col gap-4 p-6 transition-all outline-none",
                sideClasses,
                className,
            )}
            transition:fly={flyParams}
            role="dialog"
            aria-modal="true"
            {...rest}
        >
            <div class="flex items-center justify-between">
                {#if title}
                    <h2 class="text-xl font-extrabold tracking-tight uppercase">{title}</h2>
                {/if}
                <button
                    type="button"
                    class="border-foreground hover:bg-muted rounded-sm border-2 p-1 transition-all active:translate-y-[2px]"
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
