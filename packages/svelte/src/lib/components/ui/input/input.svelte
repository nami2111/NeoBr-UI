<script lang="ts">
    /**
     * A Neo-Brutalist input component.
     *
     * @example
     * ```svelte
     * <Input placeholder="Enter your email" type="email" bind:value={email} />
     * ```
     */
    import { cn } from "../../../utils";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { getFormItemContext } from "../form/form-item.svelte";

    type Props = HTMLInputAttributes & {
        /**
         * The value of the input. Can be bound.
         */
        value?: any;

        /**
         * Error state of the input.
         * Can be a boolean or an error message string.
         * If used inside a FormField, it automatically picks up validation errors.
         * @default false
         */
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
    const hasError = $derived(error || !!formItemError?.error);
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
