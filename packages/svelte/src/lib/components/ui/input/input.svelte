<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { getFormItemContext } from "../form/form-item.svelte";

    type Props = HTMLInputAttributes & {
        value?: any;
        error?: boolean | string;
    };

    let {
        class: className,
        type = "text",
        value = $bindable(""),
        error = false,
        ...rest
    }: Props = $props();

    const formItemError = getFormItemContext();
    const hasError = $derived(error || !!$formItemError?.error);
</script>

<input
    {type}
    value={value}
    oninput={(e) => (value = (e.target as HTMLInputElement).value)}
    class={cn(
        "flex h-10 w-full border-2 border-foreground bg-background px-3 py-2 text-sm font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-inner tracking-tight rounded-brutalist transition-colors",
        hasError &&
            "border-destructive text-destructive placeholder:text-destructive/60 bg-destructive/5",
        className,
    )}
    {...rest}
/>
