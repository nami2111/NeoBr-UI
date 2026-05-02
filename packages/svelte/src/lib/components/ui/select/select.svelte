<script lang="ts">
    /**
     * A Neo-Brutalist select component built on top of bits-ui.
     * Supports single and multiple selection modes with type inference.
     *
     * @example
     * ```svelte
     * <Select type="single" bind:value={selectedOption}>
     *   <SelectTrigger placeholder="Select an option" />
     *   <SelectContent>
     *     <SelectItem value="opt1">Option 1</SelectItem>
     *     <SelectItem value="opt2">Option 2</SelectItem>
     *   </SelectContent>
     * </Select>
     * ```
     */
    import { Select } from "bits-ui";
    import type { CompatibleSelectProps } from "../../../types/bits-ui-compat";

    type Props = CompatibleSelectProps<"single" | "multiple"> & {
        /**
         * Whether the select is disabled.
         * @default false
         */
        disabled?: boolean;

        children?: import("svelte").Snippet;
    };

    let {
        value = $bindable(),
        type = "single",
        disabled = false,
        children,
        ...rest
    }: Props = $props();
</script>

<Select.Root bind:value={value as any} {type} {disabled} {...rest as any}>
    {@render children?.()}
</Select.Root>
