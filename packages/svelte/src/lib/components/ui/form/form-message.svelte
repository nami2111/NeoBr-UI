<script lang="ts">
    import { cn } from "../../../utils";
    import { getFormItemContext } from "./form-item.svelte";

    const errorStore = getFormItemContext();
</script>

{#if $errorStore?.error && typeof $errorStore.error === "string"}
    <p class="text-sm font-bold text-destructive">
        {$errorStore.error}
    </p>
{/if}
