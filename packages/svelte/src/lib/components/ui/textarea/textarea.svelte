<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLTextareaAttributes } from "svelte/elements";
    import { getFormItemContext } from "../form/form-context";

    type Props = HTMLTextareaAttributes & {
        value?: string;
        error?: boolean | string;
        radius?: Radius;
    };

    let {
        class: className,
        value = $bindable(""),
        error = false,
        radius = "brutalist",
        ...rest
    }: Props = $props();

    const formItemError = getFormItemContext();
    const hasError = $derived(error || !!formItemError?.error);
</script>

<textarea
    bind:value
    class={cn(
        "border-foreground bg-background h-10 min-h-[80px] w-full border-2 px-3 py-3 text-sm font-bold shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        RADIUS[radius],
        hasError &&
            "border-destructive text-destructive placeholder:text-destructive/60 bg-destructive/5",
        className,
    )}
    {...rest}
></textarea>
