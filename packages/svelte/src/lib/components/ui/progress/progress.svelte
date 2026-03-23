<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value?: number;
        max?: number;
        indeterminate?: boolean;
    };

    let {
        value = 0,
        max = 100,
        class: className,
        indeterminate = false,
        ...rest
    }: Props = $props();

    let percentage = $derived(
        indeterminate ? 100 : Math.min(100, Math.max(0, (value / max) * 100)),
    );
</script>

<div
    class={cn(
        "border-foreground bg-background shadow-brutalist rounded-brutalist relative h-6 w-full overflow-hidden border-2",
        className,
    )}
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={indeterminate ? undefined : value}
    {...rest}
>
    <div
        class={cn(
            "bg-primary h-full w-full flex-1 transition-all duration-300",
            indeterminate && "animate-progress-indeterminate origin-left",
        )}
        style={indeterminate ? "" : `transform: translateX(-${100 - percentage}%)`}
    ></div>
</div>

<style>
    @keyframes progress-indeterminate {
        0% {
            transform: translateX(-100%) scaleX(0.2);
        }
        50% {
            transform: translateX(0%) scaleX(0.5);
        }
        100% {
            transform: translateX(100%) scaleX(0.2);
        }
    }

    :global(.animate-progress-indeterminate) {
        animation: progress-indeterminate 2s infinite linear;
    }
</style>
