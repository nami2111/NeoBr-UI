<script lang="ts">
    import { getContext } from "svelte";
    import { scale } from "svelte/transition";
    import { cn } from "../../../utils";

    type Props = {
        value: string;
        disabled?: boolean;
        class?: string;
        id?: string;
        [key: string]: any;
    };

    let {
        value: itemValue,
        disabled = false,
        class: className,
        id,
        ...rest
    }: Props = $props();

    const ctx = getContext<{
        value: string;
        disabled: boolean;
        name?: string;
    }>("radio-group");

    if (!ctx) {
        throw new Error("RadioGroupItem must be used within RadioGroup");
    }

    let isSelected = $derived(ctx.value === itemValue);
    let isItemDisabled = $derived(ctx.disabled || disabled);
</script>

<div class={cn("relative flex items-center h-6 w-6 shrink-0", className)}>
    <input
        type="radio"
        checked={isSelected}
        disabled={isItemDisabled}
        name={ctx.name}
        value={itemValue}
        {id}
        class="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        onclick={() => (ctx.value = itemValue)}
        {...rest}
    />
    <div
        class={cn(
            "flex h-full w-full items-center justify-center rounded-full border-3 border-foreground bg-background transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:opacity-50 shadow-sm",
            isSelected && "border-primary",
        )}
    >
        {#if isSelected}
            <div
                class="h-3 w-3 rounded-full bg-primary"
                transition:scale={{ duration: 150 }}
            ></div>
        {/if}
    </div>
</div>
