<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "../../../utils";
    import type { CompatibleAccordionProps } from "../../../types/bits-ui-compat";

    type Props = CompatibleAccordionProps<"single" | "multiple"> & {
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

<Accordion.Root
    bind:value={value as never}
    {type}
    class={cn(
        "border-foreground rounded-brutalist w-full overflow-hidden border-x-2 border-t-2",
        className,
    )}
    {...(rest as Record<string, unknown>)}
>
    {@render children?.()}
</Accordion.Root>
