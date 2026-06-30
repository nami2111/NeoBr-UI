<script lang="ts">
    import { scale } from "svelte/transition";
    import { cn } from "../../../utils";
    import { TRANSITION_BRUTALIST } from "../../../utils/motion";
    import { useOverlayController } from "../../../utils/overlay.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        content: string;
        class?: string;
        position?: "top" | "bottom" | "left" | "right";
        open?: boolean;
        children?: import("svelte").Snippet;
    };

    let {
        content,
        class: className,
        position = "top",
        open = $bindable(false),
        children,
        ...rest
    }: Props = $props();
    const tooltipUid = $props.id();
    const tooltipId = `tooltip-${tooltipUid}`;

    function close() {
        open = false;
    }

    const overlay = useOverlayController({
        open: () => open,
        close,
        trapFocus: false,
    });

    const positions = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2",
        bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-2",
        left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2 mr-2",
        right: "top-1/2 -right-2 translate-x-full -translate-y-1/2 ml-2",
    };
</script>

<svelte:window onkeydown={overlay.handleKeydown} />

<div class="relative inline-block">
    <button
        type="button"
        class="cursor-pointer"
        aria-describedby={open ? tooltipId : undefined}
        onmouseenter={() => (open = true)}
        onmouseleave={() => (open = false)}
        onfocusin={() => (open = true)}
        onfocusout={() => (open = false)}
        {...rest}
    >
        {@render children?.()}
    </button>

    {#if open}
        <div
            {@attach overlay.content}
            id={tooltipId}
            role="tooltip"
            class={cn(
                "z-tooltip border-foreground bg-foreground text-background shadow-brutalist pointer-events-none absolute rounded-brutalist border-2 px-3 py-1.5 text-xs font-bold whitespace-nowrap",
                positions[position],
                className,
            )}
            transition:scale={{ start: 0.9, ...TRANSITION_BRUTALIST }}
        >
            {content}
        </div>
    {/if}
</div>
