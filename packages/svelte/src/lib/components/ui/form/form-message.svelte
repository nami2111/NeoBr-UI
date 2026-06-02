<script lang="ts">
    import { cn } from "../../../utils";
    import { getFormItemContext } from "./form-context";

    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { class: className, children }: Props = $props();

    const errorState = getFormItemContext();
</script>

{#if children}
    <p class={cn("text-destructive text-sm font-bold", className)}>
        {@render children()}
    </p>
{:else if errorState?.error && typeof errorState.error === "string"}
    <p class={cn("text-destructive text-sm font-bold", className)}>
        {errorState.error}
    </p>
{/if}
