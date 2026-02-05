<script lang="ts">
    import { cn } from "../../../utils";
    import { getFormItemContext } from "./form-item.svelte";
    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { class: className, children }: Props = $props();

    const errorStore = getFormItemContext();
</script>

{#if children}
    <p class={cn("text-destructive text-sm font-bold", className)}>
        {@render children()}
    </p>
{:else if $errorStore?.error && typeof $errorStore.error === "string"}
    <p class={cn("text-destructive text-sm font-bold", className)}>
        {$errorStore.error}
    </p>
{/if}
