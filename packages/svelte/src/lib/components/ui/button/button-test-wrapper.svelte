<script lang="ts">
    import Button from "./button.svelte";
    import type { ComponentProps } from "svelte";

    type Props = ComponentProps<typeof Button> & {
        childrenText?: string;
    };

    let { childrenText = "Click me", href, ...rest }: Props = $props();
</script>

<Button {href} {...rest}>
    {childrenText}
</Button>
