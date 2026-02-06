<script lang="ts">
    import { Select } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Select.TriggerProps & {
        class?: string;
        placeholder?: string;
        children?: import("svelte").Snippet;
    };

    let { class: className, placeholder = "Select an option", children, ...rest }: Props = $props();
</script>

<Select.Trigger
    class={cn(
        "rounded-brutalist border-foreground bg-background shadow-brutalist hover:shadow-brutalist-hover focus:ring-ring flex h-12 w-full cursor-pointer items-center justify-between border-2 px-4 py-2 text-sm font-bold transition-all hover:-translate-y-[2px] focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:rotate-0",
        className,
    )}
    {...rest}
>
    <span class="pointer-events-none truncate">
        {#if children}
            {@render children()}
        {:else}
            {placeholder}
        {/if}
    </span>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="square"
        stroke-linejoin="miter"
        class={cn("transition-transform duration-200 group-data-[state=open]:rotate-180")}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
</Select.Trigger>
