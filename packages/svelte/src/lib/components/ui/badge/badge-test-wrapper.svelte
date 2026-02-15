<script lang="ts">
    import Badge from "./badge.svelte";

    let {
        text = "Default Content",
        ...rest
    }: {
        text?: string;
        [key: string]: any;
    } = $props();
</script>

<Badge {...rest}>
    {text}
</Badge>
