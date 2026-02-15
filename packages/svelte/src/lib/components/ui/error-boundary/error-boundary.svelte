<script lang="ts">
    import { Alert, AlertTitle, AlertDescription } from "../alert";
    import { Button } from "../button";
    import { Icon } from "../icon";
    import { AlertCircleIcon } from "@hugeicons/core-free-icons";

    type Props = {
        children?: import("svelte").Snippet;
        fallback?: import("svelte").Snippet<[any, () => void]>;
        onRetry?: () => void;
    };

    let { children, fallback, onRetry }: Props = $props();
</script>

{#snippet defaultFallback(error: any, reset: () => void)}
    <Alert variant="destructive" brutalist={true} class="my-4">
        <Icon icon={AlertCircleIcon} class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            <p class="mb-2">Something went wrong.</p>
            <p class="mb-4 rounded bg-black/10 p-2 font-mono text-xs opacity-70">
                {error?.message || "Unknown error"}
            </p>

            <Button
                variant="outline"
                size="sm"
                onclick={() => {
                    onRetry?.();
                    reset();
                }}
            >
                {onRetry ? "Try Again" : "Retry"}
            </Button>
        </AlertDescription>
    </Alert>
{/snippet}

<svelte:boundary failed={fallback || defaultFallback}>{@render children?.()}</svelte:boundary>
