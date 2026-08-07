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

    type Props = CompatibleSelectProps & {
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

<!--
    bits-ui 2.18 types `SelectRootProps` as a discriminated union on `type`
    (single: value?: string | multiple: value?: string[]). Svelte's `bind:`
    narrows a union-typed component to its last branch, so neither `value` nor
    the union itself can be passed without a cast — `never` is assignable to
    both branches and documents that the runtime validates via `type`.
    The `Record<string, unknown>` rest cast is load-bearing too: its index
    signature keeps TS from re-narrowing the union on the `type` prop.
-->
<Select.Root bind:value={value as never} {type} {disabled} {...(rest as Record<string, unknown>)}>
    {@render children?.()}
</Select.Root>
