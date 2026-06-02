<script lang="ts">
    import { getCommandState } from "./command.svelte";
    import { cn } from "../../../utils";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        class?: string;
        value?: string;
        onSelect?: (value: string) => void;
        children?: import("svelte").Snippet;
    };

    let {
        class: className,
        value,
        onSelect,
        children,
        disabled = false,
        ...rest
    }: Props = $props();

    const state = getCommandState();
    const itemId = $props.id();

    let normalizedValue = $derived((value || "").toLowerCase());
    let normalizedSearch = $derived(state?.search.trim().toLowerCase() ?? "");
    let isVisible = $derived(!normalizedSearch || normalizedValue.includes(normalizedSearch));

    $effect(() => {
        state?.upsertItem(itemId, value || "");

        return () => {
            state?.unregisterItem(itemId);
        };
    });

    function handleSelect() {
        if (!disabled && value) {
            onSelect?.(value);
        }
    }
</script>

{#if isVisible}
    <button
        type="button"
        class={cn(
            "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50",
            className,
        )}
        {disabled}
        onclick={handleSelect}
        {...rest}
    >
        {@render children?.()}
    </button>
{/if}
