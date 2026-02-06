<script lang="ts">
    import { cn } from "$lib/utils";

    interface Props {
        class?: string;
        direction?: "left" | "right";
        speed?: number;
        pauseOnHover?: boolean;
        gap?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    }

    let {
        class: className = undefined,
        direction = "left",
        speed = 20,
        pauseOnHover = false,
        gap = "1rem",
        children,
        ...rest
    }: Props = $props();
</script>

<div
    class={cn("group flex overflow-hidden select-none", className)}
    style="--gap: {gap}; --duration: {speed}s;"
    {...rest}
>
    <div
        class={cn(
            "flex min-w-full shrink-0 justify-around gap-[var(--gap)]",
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
    >
        {@render children?.()}
        {@render children?.()}
    </div>
</div>

<style>
    @keyframes marquee {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(calc(-100% - var(--gap)));
        }
    }

    :global(.animate-marquee) {
        animation: marquee var(--duration) linear infinite;
    }

    :global(.animate-marquee-reverse) {
        animation: marquee var(--duration) linear infinite reverse;
    }
</style>
