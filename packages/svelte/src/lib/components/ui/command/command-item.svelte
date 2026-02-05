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
        !state?.search ||
            (value || "").toLowerCase().includes(state.search.toLowerCase()),
    );

    function handleSelect() {
        if (!disabled && value) {
            onSelect?.(value);
        }
    }
</script>

{#if isVisible}
    <div
        role="button"
        tabindex="0"
        class={cn(
            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
            className,
        )}
        data-disabled={disabled}
        onclick={handleSelect}
        onkeydown={(e) => e.key === "Enter" && handleSelect()}
        {...rest}
    >
        {@render children?.()}
    </div>
{/if}
