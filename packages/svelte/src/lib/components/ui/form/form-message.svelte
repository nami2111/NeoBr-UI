<script lang="ts">
    import { cn } from "../../../utils";
    import { getFormItemContext } from "./form-context";

    /** Displays the enclosing `FormItem`'s error. Falls back to `children` when no error is set. */
    type Props = {
        /** Additional classes for the message. */
        class?: string;
        /** Custom message content, shown when there is no error string. */
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
