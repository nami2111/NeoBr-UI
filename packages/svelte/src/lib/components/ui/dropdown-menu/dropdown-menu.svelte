<script lang="ts">
    import { cn } from "$lib/utils";
    import { createEventDispatcher } from "svelte";

    // NOTE: This is a simplified dropdown implementation.
    // For production, consider using a headless UI library like melt-ui or bits-ui for accessibility.

    export let open: boolean = false;

    let triggerElement: HTMLElement;
    let menuElement: HTMLElement;

    const dispatch = createEventDispatcher();

    function toggle() {
        open = !open;
    }

    function close() {
        open = false;
    }

    function handleOutsideClick(event: MouseEvent) {
        if (
            open &&
            triggerElement &&
            !triggerElement.contains(event.target as Node) &&
            menuElement &&
            !menuElement.contains(event.target as Node)
        ) {
            close();
        }
    }

    $: if (open) {
        if (typeof document !== "undefined") {
            document.addEventListener("click", handleOutsideClick);
        }
    } else {
        if (typeof document !== "undefined") {
            document.removeEventListener("click", handleOutsideClick);
        }
    }
</script>

<div class="relative inline-block text-left">
    <div
        role="button"
        tabindex="0"
        on:click={toggle}
        on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggle();
        }}
        bind:this={triggerElement}
    >
        <slot name="trigger" />
    </div>

    {#if open}
        <div
            bind:this={menuElement}
            class={cn(
                "absolute right-0 z-50 mt-2 min-w-[8rem] origin-top-right bg-popover p-1 text-popover-foreground shadow-brutalist border-2 border-foreground animate-in fade-in-0 zoom-in-95",
            )}
            role="menu"
            tabindex="-1"
        >
            <slot />
        </div>
    {/if}
</div>
