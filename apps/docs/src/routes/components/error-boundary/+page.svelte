<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { ErrorBoundary, Button, Alert, AlertTitle, AlertDescription } from "@neobr/svelte";

    // Example that simulates an error
    let shouldThrow = $state(false);

    const basicUsage = `<ErrorBoundary>
    <YourComponent />
</ErrorBoundary>`;

    const retryExample = `<ErrorBoundary onRetry={() => reloadData()}>
    <DataComponent />
</ErrorBoundary>`;

    const customFallback = `<ErrorBoundary>
    {#snippet fallback(error, reset)}
        <Alert variant="destructive">
            <AlertTitle>Custom Error UI</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : "Unknown error"}</AlertDescription>
            <Button onclick={reset} class="mt-4">Try Again</Button>
        </Alert>
    {/snippet}
    <YourComponent />
</ErrorBoundary>`;
</script>

<DocPage
    title="Error Boundary"
    description="A component that catches render errors in its child tree and displays a fallback UI."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Basic Usage</h2>
            <p class="text-muted-foreground">
                By default, ErrorBoundary displays a Neo-Brutalist alert when a child render error
                occurs.
            </p>
            <CodePreview code={basicUsage}>
                <div class="space-y-4">
                    {#if shouldThrow}
                        <ErrorBoundary onRetry={() => (shouldThrow = false)}>
                            {(() => {
                                throw new Error("This is a simulated render error.");
                            })()}
                        </ErrorBoundary>
                    {:else}
                        <div
                            class="border-foreground rounded-brutalist border-2 border-dashed p-8 text-center"
                        >
                            <p class="mb-4 font-bold italic">Everything is running smoothly.</p>
                            <Button onclick={() => (shouldThrow = true)} variant="destructive">
                                Trigger Error
                            </Button>
                        </div>
                    {/if}
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Custom Fallback</h2>
            <p class="text-muted-foreground">
                You can provide a custom fallback UI using the <code>fallback</code> snippet.
            </p>
            <CodePreview code={customFallback}>
                <div class="border-foreground rounded-brutalist bg-muted border-2 p-4 text-center">
                    <p class="text-sm font-bold opacity-50">Example code shown above</p>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Props</h2>
            <div
                class="border-foreground divide-foreground rounded-brutalist divide-y overflow-hidden border-2"
            >
                <div class="bg-muted grid grid-cols-3 p-3 font-black tracking-tighter uppercase">
                    <div>Prop</div>
                    <div>Type</div>
                    <div>Default</div>
                </div>
                <div class="grid grid-cols-3 p-3 text-sm font-bold">
                    <div class="font-mono">onRetry</div>
                    <div class="text-primary font-mono">() => void</div>
                    <div class="text-muted-foreground font-mono">undefined</div>
                </div>
                <div class="grid grid-cols-3 p-3 text-sm font-bold">
                    <div class="font-mono">fallback</div>
                    <div class="text-primary font-mono">Snippet</div>
                    <div class="text-muted-foreground font-mono">Default Alert</div>
                </div>
            </div>
        </section>
    </div>
</DocPage>
