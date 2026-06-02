<script lang="ts">
    import { scale } from "svelte/transition";
    import { cn } from "../../../utils";
    import { TRANSITION_BRUTALIST } from "../../../utils/motion";
    import { requireRadioGroupState } from "./radio-group-context";

    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        value: string;
        disabled?: boolean;
        id?: string;
    };

    let { value: itemValue, disabled = false, class: className, id, ...rest }: Props = $props();

    const ctx = requireRadioGroupState();

    let isSelected = $derived(ctx.value === itemValue);
    let isItemDisabled = $derived(ctx.disabled || disabled);
</script>

<div class={cn("relative flex h-6 w-6 shrink-0 items-center", className)}>
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
            "border-foreground bg-background peer-focus-visible:ring-ring flex h-full w-full items-center justify-center rounded-full border-2 shadow-brutalist transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-disabled:opacity-50",
            isSelected && "border-primary",
        )}
    >
        {#if isSelected}
            <div class="bg-primary h-3 w-3 rounded-full" transition:scale={TRANSITION_BRUTALIST}></div>
        {/if}
    </div>
</div>
