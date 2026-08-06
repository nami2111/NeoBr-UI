<script lang="ts">
    import { Alert, AlertTitle, AlertDescription } from "../alert";
    import { Button } from "../button";
    import { Icon } from "../icon";
    import { AlertCircleIcon } from "@hugeicons/core-free-icons";

    type Props = {
        /** Content to render and guard against errors. */
        children?: import("svelte").Snippet;
        /** Custom error UI. Receives the caught error and a `reset` callback. */
        fallback?: import("svelte").Snippet<[unknown, () => void]>;
        /** Called when the user retries after an error. */
        onRetry?: () => void;
    };

    let { children, fallback, onRetry }: Props = $props();

    function getErrorMessage(error: unknown) {
        return error instanceof Error ? error.message : "Unknown error";
    }
</script>

{#snippet defaultFallback(error: unknown, reset: () => void)}
    <Alert variant="destructive" class="my-4">
        <Icon icon={AlertCircleIcon} class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            <p class="mb-2">Something went wrong.</p>
            <p class="mb-4 rounded bg-black/10 p-2 font-mono text-xs opacity-70">
                {getErrorMessage(error)}
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
