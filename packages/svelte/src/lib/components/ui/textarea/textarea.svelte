<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLTextareaAttributes } from "svelte/elements";
    import { getFormItemContext } from "../form/form-item.svelte";

    type Props = HTMLTextareaAttributes & {
        value?: string;
        error?: boolean | string;
    };

    let { class: className, value = $bindable(""), error = false, ...rest }: Props = $props();

    const formItemError = getFormItemContext();
    const hasError = $derived(error || !!formItemError?.error);
</script>

<textarea
    bind:value
    class={cn(
        "input-brutalist min-h-[80px] py-3",
        hasError &&
            "border-destructive text-destructive placeholder:text-destructive/60 bg-destructive/5",
        className,
    )}
    {...rest}
></textarea>
