<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        src?: string;
        alt?: string;
        fallback?: string;
        size?: "sm" | "md" | "lg" | "xl";
        shape?: "circle" | "square";
    };

    let {
        src,
        alt = "",
        fallback,
        class: className,
        size = "md",
        shape = "circle",
        ...rest
    }: Props = $props();

    let error = $state(false);

    const sizes = {
        sm: "h-8 w-8 text-xs",
        md: "h-12 w-12 text-sm",
        lg: "h-16 w-16 text-base",
        xl: "h-20 w-20 text-lg",
    };

    const shapes = {
        circle: "rounded-full",
        square: "rounded-sm",
    };
</script>

<div
    class={cn(
        "border-foreground bg-muted relative flex shrink-0 overflow-hidden border-2 shadow-brutalist",
        sizes[size],
        shapes[shape],
        className,
    )}
    {...rest}
>
    {#if src && !error}
        <img
            {src}
            {alt}
            class="aspect-square h-full w-full object-cover"
            onerror={() => (error = true)}
        />
    {:else}
        <div
            class="bg-primary text-primary-foreground flex h-full w-full items-center justify-center font-bold uppercase"
        >
            {fallback || alt.slice(0, 2) || "??"}
        </div>
    {/if}
</div>
