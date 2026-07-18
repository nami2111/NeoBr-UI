<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        /** Additional classes for the scroll container. */
        class?: string;
        /** Scrollable content. */
        children?: import("svelte").Snippet;
        /**
         * Which axes may scroll.
         * @default "vertical"
         */
        orientation?: "vertical" | "horizontal" | "both";
    };

    let { class: className, children, orientation = "vertical", ...rest }: Props = $props();
</script>

<div
    class={cn(
        "scroll-area border-foreground bg-background shadow-brutalist relative border-2",
        orientation === "vertical" && "h-full overflow-x-hidden overflow-y-auto",
        orientation === "horizontal" && "w-full overflow-x-auto overflow-y-hidden",
        orientation === "both" && "h-full w-full overflow-auto",
        className,
    )}
    {...rest}
>
    <div class="w-full">
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
