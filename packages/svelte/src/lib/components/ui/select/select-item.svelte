<script lang="ts">
    import { Select } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { Tick02Icon } from "@hugeicons/core-free-icons";

    type Props = Omit<Select.ItemProps, "children"> & {
        value: string;
        disabled?: boolean;
        label?: string;
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { value, disabled = false, label, class: className, children, ...rest }: Props = $props();
</script>

<Select.Item
    {value}
    {disabled}
    label={label ?? value}
    class={cn(
        "group data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground focus:bg-primary focus:text-primary-foreground relative flex w-full cursor-pointer items-center rounded-sm px-3 py-2 text-sm font-bold transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50",
        "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        className,
    )}
    {...rest}
>
    {@render children?.()}

    <span class="ml-auto opacity-0 transition-opacity group-data-[state=checked]:opacity-100">
        <Icon icon={Tick02Icon} size={16} strokeWidth={4} />
    </span>
</Select.Item>
