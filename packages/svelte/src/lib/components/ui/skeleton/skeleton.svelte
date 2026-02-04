<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        [key: string]: any;
    };

    let { class: className, ...rest }: Props = $props();
</script>

<div
    class={cn(
        "animate-pulse rounded-xs bg-muted/60 border-2 border-foreground/20 overflow-hidden relative",
        className,
    )}
    {...rest}
>
    <div class="absolute inset-0 animate-skeleton-shimmer"></div>
</div>

<style>
    @keyframes skeleton-shimmer {
        0% {
            transform: translateX(-150%) skewX(-20deg);
        }
        100% {
            transform: translateX(150%) skewX(-20deg);
        }
    }

    .animate-skeleton-shimmer {
        position: absolute;
        inset: -100% -50%;
        background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 65%,
            transparent 100%
        );
        animation: skeleton-shimmer 1.5s infinite ease-in-out;
    }

    /* Dark mode adjustment */
    :global([data-theme="dark"]) .animate-skeleton-shimmer {
        background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 65%,
            transparent 100%
        );
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
