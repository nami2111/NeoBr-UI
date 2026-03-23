<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { class: className, ...rest }: Props = $props();
</script>

<div
    role="status"
    aria-busy="true"
    aria-label="Loading content"
    class={cn(
        "bg-muted/60 border-foreground/20 relative animate-pulse overflow-hidden rounded-sm border-2",
        className,
    )}
    {...rest}
>
    <div class="animate-skeleton-shimmer absolute inset-0"></div>
</div>

<style>
    @keyframes skeleton-shimmer {
        0% {
            transform: translateX(-150%) skewX(-20deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateX(150%) skewX(-20deg);
            opacity: 0.3;
        }
    }

    .animate-skeleton-shimmer {
        position: absolute;
        inset: -100% -50%;
        background-color: var(--color-foreground);
        opacity: 0.08;
        animation: skeleton-shimmer 1.5s infinite ease-in-out;
    }

    :global(.dark) .animate-skeleton-shimmer {
        opacity: 0.15;
    }

    /* Standard pulse for the container */
    @keyframes pulse-brutalist {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }

    .animate-pulse {
        animation: pulse-brutalist 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>
