<script lang="ts">
    /**
     * A Neo-Brutalist input component.
     *
     * @example
     * ```svelte
     * <Input placeholder="Enter your email" type="email" bind:value={email} />
     * ```
     */
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { getFormItemContext } from "../form/form-context";

    type Props = HTMLInputAttributes & {
        /**
         * The value of the input. Can be bound.
         */
        value?: string | number | undefined;

        /**
         * Error state of the input.
         * Can be a boolean or an error message string.
         * If used inside a FormField, it automatically picks up validation errors.
         * @default false
         */
        error?: boolean | string;
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    };

    let {
        class: className,
        type = "text",
        value = $bindable(""),
        error = false,
        radius = "brutalist",
        ...rest
    }: Props = $props();

    const formItemError = getFormItemContext();
    const hasError = $derived(error || !!formItemError?.error);
</script>

<input
    {type}
    bind:value
    class={cn(
        "border-foreground bg-background h-10 w-full border-2 px-3 py-2 text-sm font-bold shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        RADIUS[radius],
        hasError &&
            "border-destructive text-destructive placeholder:text-destructive/60 bg-destructive/5",
        className,
    )}
    {...rest}
/>
