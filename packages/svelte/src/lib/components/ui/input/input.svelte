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
    {value}
    oninput={(e) => (value = (e.target as HTMLInputElement).value)}
    class={cn(
        "input-brutalist",
        hasError &&
            "border-destructive text-destructive placeholder:text-destructive/60 bg-destructive/5",
        className,
    )}
    {...rest}
/>
