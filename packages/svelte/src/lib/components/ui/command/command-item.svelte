<script lang="ts">
    import { getCommandState } from "./command.svelte";
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        value?: string;
        onSelect?: (value: string) => void;
        children?: import("svelte").Snippet;
        disabled?: boolean;
        [key: string]: any;
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

    let isVisible = $derived(
        !state?.search || (value || "").toLowerCase().includes(state.search.toLowerCase()),
    );

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
