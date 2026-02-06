<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Omit<Accordion.RootProps, "value" | "type"> & {
        value?: string | string[];
        type?: "single" | "multiple";
        class?: string;
    };

    let {
        value = $bindable(),
        type = "single",
        class: className,
        children,
        ...rest
    }: Props = $props();
</script>

<!-- @ts-expect-error - Bits UI union types are too complex for Svelte 5 prop inference but runtime is correct -->
<Accordion.Root
    bind:value={value as any}
    {type}
    class={cn(
        "border-foreground rounded-brutalist w-full overflow-hidden border-x-2 border-t-2",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</Accordion.Root>
