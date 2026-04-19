<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { cn } from "../../../utils";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        content: string;
        class?: string;
        position?: "top" | "bottom" | "left" | "right";
        children?: import("svelte").Snippet;
    };

    let { content, class: className, position = "top", children, ...rest }: Props = $props();

    let visible = $state(false);
    const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;

    const positions = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2",
        bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-2",
        left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2 mr-2",
        right: "top-1/2 -right-2 translate-x-full -translate-y-1/2 ml-2",
    };
</script>

<div class="relative inline-block">
    <button
        type="button"
        class="cursor-pointer"
        aria-describedby={visible ? tooltipId : undefined}
        onmouseenter={() => (visible = true)}
        onmouseleave={() => (visible = false)}
        onfocusin={() => (visible = true)}
        onfocusout={() => (visible = false)}
        {...rest}
    >
        {@render children?.()}
    </button>

    {#if visible}
        <div
            id={tooltipId}
            role="tooltip"
            class={cn(
                "border-foreground bg-foreground text-background shadow-brutalist pointer-events-none absolute z-[100] rounded-brutalist border-2 px-3 py-1.5 text-xs font-bold whitespace-nowrap",
                positions[position],
                className,
            )}
            transition:scale={{ duration: 150, start: 0.9 }}
        >
            {content}
        </div>
    {/if}
</div>
