<script lang="ts">
    import { cn } from "../../../utils";
    import { fade } from "svelte/transition";

    type Props = {
        open?: boolean;
        trigger?: import("svelte").Snippet;
        children?: import("svelte").Snippet;
        class?: string;
        contentClass?: string;
    };

    let {
        open = $bindable(false),
        trigger,
        children,
        class: className,
        contentClass,
    }: Props = $props();

    function toggle() {
        open = !open;
    }

    function close() {
        open = false;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (open && e.key === "Escape") {
            e.preventDefault();
            close();
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class={cn("relative inline-block text-left", className)}>
    <button
        type="button"
        onclick={toggle}
        class="cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={open}
    >
        {@render trigger?.()}
    </button>

    {#if open}
        <div
            class={cn(
                "border-foreground bg-background shadow-brutalist rounded-brutalist absolute z-50 mt-2 min-w-[200px] border-2 p-4",
                contentClass,
            )}
            transition:fade={{ duration: 100 }}
            role="dialog"
        >
            {@render children?.()}
        </div>
        <div class="fixed inset-0 z-40" onclick={close} role="presentation"></div>
    {/if}
</div>
