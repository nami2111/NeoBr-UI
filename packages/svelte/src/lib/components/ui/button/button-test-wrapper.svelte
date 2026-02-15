<script lang="ts">
    import Button from "./button.svelte";

    let {
        childrenText = "Click me",
        href,
        ...rest
    }: {
        childrenText?: string;
        href?: string;
        [key: string]: any;
    } = $props();
</script>

<Button {href} {...rest}>
    {childrenText}
</Button>
