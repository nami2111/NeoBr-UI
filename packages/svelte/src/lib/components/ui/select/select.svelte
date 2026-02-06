<script lang="ts">
    import { Select } from "bits-ui";
    import type { SelectRootProps } from "bits-ui";

    type Props = Omit<SelectRootProps, "value" | "type"> & {
        value?: string | string[];
        type?: "single" | "multiple";
        disabled?: boolean;
        children?: import("svelte").Snippet;
        [key: string]: any;
    };

    let {
        value = $bindable(),
        type = "single",
        disabled = false,
        children,
        ...rest
    }: Props = $props();
</script>

<!-- @ts-expect-error - Bits UI union types are too complex for Svelte 5 prop inference -->
<Select.Root bind:value={value as any} {type} {disabled} {...rest}>
    {@render children?.()}
</Select.Root>
