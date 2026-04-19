<script lang="ts">
    import Link from "./link.svelte";

    let { text = "Link", ...rest }: { text?: string; [key: string]: any } = $props();
</script>

<Link {...rest}>{text}</Link>
