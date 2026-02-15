<script lang="ts">
    import ErrorBoundary from "./error-boundary.svelte";
    import TestHelper from "./error-boundary-test-helper.svelte";

    let { shouldThrow = false, onRetry }: { shouldThrow?: boolean; onRetry?: () => void } =
        $props();
</script>

<ErrorBoundary {onRetry}>
    <TestHelper {shouldThrow} />
</ErrorBoundary>
