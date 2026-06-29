<script lang="ts">
    import { Select } from "bits-ui";
    import { cn, RADIUS, type Radius } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { ChevronDown } from "@hugeicons/core-free-icons";

    type Props = Omit<Select.TriggerProps, "children"> & {
        class?: string;
        placeholder?: string;
        radius?: Radius;
        children?: import("svelte").Snippet<[]>;
    };

    let {
        class: className,
        placeholder = "Select an option",
        radius = "brutalist",
        children: triggerChildren,
        ...rest
    }: Props = $props();
</script>

<Select.Trigger
    class={cn(
        "border-foreground bg-background shadow-brutalist hover:shadow-brutalist-hover focus-visible:ring-ring group flex h-12 w-full cursor-pointer items-center justify-between border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        RADIUS[radius],
        className,
    )}
    {...rest}
>
    <Select.Value class="pointer-events-none truncate">
        {#snippet children({ selection })}
            {#if triggerChildren}
                {@render triggerChildren()}
            {:else if selection.type === "single" && selection.selected}
                {selection.selected.label}
            {:else if selection.type === "multiple" && selection.selected.length > 0}
                {selection.selected.map((item) => item.label).join(", ")}
            {:else}
                {placeholder}
            {/if}
        {/snippet}
    </Select.Value>
    <Icon
        icon={ChevronDown}
        size={16}
        strokeWidth={3}
        class="transition-transform duration-200 group-data-[state=open]:rotate-180"
    />
</Select.Trigger>
