<script lang="ts">
    import Label from "./label.svelte";

    let { text = "Label", ...rest }: { text?: string; [key: string]: any } = $props();
</script>

<Label {...rest}>{text}</Label>
