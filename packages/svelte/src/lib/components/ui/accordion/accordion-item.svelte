<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "../../../utils";

    type Props = Accordion.ItemProps & {
        /** Additional classes for the accordion item. */
        class?: string;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<Accordion.Item class={cn("border-foreground border-b-2", className)} {...rest}>
    {@render children?.()}
</Accordion.Item>
