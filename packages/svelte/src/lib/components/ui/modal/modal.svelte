<script lang="ts">
    import { cn } from "$lib/utils";
    import { createEventDispatcher } from "svelte";

    export let open: boolean = false;
    export let closeOnOutsideClick: boolean = true;

    const dispatch = createEventDispatcher();

    function close() {
        open = false;
        dispatch("close");
    }

    function handleOutsideClick(event: MouseEvent) {
        if (closeOnOutsideClick && event.target === event.currentTarget) {
            close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && open) {
            close();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        on:click={handleOutsideClick}
    >
        <div
            role="dialog"
            aria-modal="true"
            class={cn(
                "relative w-full max-w-lg bg-background p-6 shadow-impact",
                "border-2 border-foreground",
                "animate-in fade-in zoom-in-95 duration-200",
            )}
            {...$$restProps}
        >
            <button
                class="absolute right-4 top-4 rounded-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                on:click={close}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                <span class="sr-only">Close</span>
            </button>
            <slot />
        </div>
    </div>
{/if}
