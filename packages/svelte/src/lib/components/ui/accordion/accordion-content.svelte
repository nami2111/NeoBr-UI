<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Accordion.ContentProps & {
        /** Additional classes for the accordion content panel. */
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Accordion.Content
    class={cn("overflow-hidden px-4 pt-0 text-sm font-medium data-[state=open]:pb-4", className)}
    {...rest}
>
    {@render children?.()}
</Accordion.Content>
