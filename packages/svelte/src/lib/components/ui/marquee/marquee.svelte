<script lang="ts">
    import { cn } from "../../../utils";

    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        direction?: "left" | "right";
        speed?: number;
        pauseOnHover?: boolean;
        gap?: string;
        children?: import("svelte").Snippet;
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
        <span aria-hidden="true">{@render children?.()}</span>
    </div>
</div>
