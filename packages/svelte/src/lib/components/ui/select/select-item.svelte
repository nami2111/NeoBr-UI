<script lang="ts">
    import { Select } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Omit<Select.ItemProps, "children"> & {
        value: string;
        disabled?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { value, disabled = false, class: className, children, ...rest }: Props = $props();
</script>

<Select.Item
    {value}
    {disabled}
    class={cn(
        "group data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground focus:bg-primary focus:text-primary-foreground relative flex w-full cursor-pointer items-center rounded-sm px-3 py-2 text-sm font-bold transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50",
        "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        className,
    )}
    {...rest}
>
    {@render children?.()}

    <span class="ml-auto opacity-0 transition-opacity group-data-[state=checked]:opacity-100">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="square"
            stroke-linejoin="miter"
        >
            <path d="M20 6L9 17L4 12" />
        </svg>
    </span>
</Select.Item>
