<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        onclick?: () => void;
        disabled?: boolean;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let {
        class: className,
        onclick = () => {},
        disabled = false,
        children,
        ...rest
    }: Props = $props();
</script>

<button
    type="button"
    role="menuitem"
    tabindex="-1"
    {disabled}
    data-disabled={disabled}
    class={cn(
        "hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center px-4 py-2 text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50",
        className,
    )}
    onclick={(e) => {
        onclick();
    }}
    {...rest}
>
    {@render children?.()}
</button>
