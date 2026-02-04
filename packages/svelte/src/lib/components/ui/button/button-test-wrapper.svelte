<script lang="ts">
    import Button from "./button.svelte";
    let { ...props } = $props();
</script>

<Button {...props}>
    {#if props.childrenText}
        {props.childrenText}
    {/if}
</Button>
