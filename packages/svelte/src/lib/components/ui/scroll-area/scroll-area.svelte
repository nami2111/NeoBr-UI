<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
        orientation?: "vertical" | "horizontal" | "both";
    };

    let {
        class: className,
        children,
        orientation = "vertical",
        ...rest
    }: Props = $props();
</script>

<div
    class={cn(
        "scroll-area relative overflow-auto border-2 border-foreground bg-background shadow-brutalist",
        orientation === "vertical" && "overflow-x-hidden",
        orientation === "horizontal" && "overflow-y-hidden",
        className,
    )}
    {...rest}
>
    <div class="h-full w-full">
        {@render children?.()}
    </div>
</div>

<style>
    .scroll-area {
        scrollbar-width: auto;
        scrollbar-color: var(--color-foreground) var(--color-secondary);
    }

    /* Webkit (Safari/Chrome/Edge) */
    .scroll-area::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    .scroll-area::-webkit-scrollbar-track {
        background: var(--color-secondary);
        border-left: 2px solid var(--color-foreground);
    }

    .scroll-area::-webkit-scrollbar-thumb {
        background-color: var(--color-foreground);
        border: 2px solid var(--color-foreground);
    }

    .scroll-area::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-primary);
    }

    /* Horizontal track adjustments */
    .scroll-area.overflow-y-hidden::-webkit-scrollbar-track {
        border-left: none;
        border-top: 2px solid var(--color-foreground);
    }
</style>
