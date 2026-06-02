<script lang="ts">
    import Badge from "./badge.svelte";
    import type { ComponentProps } from "svelte";

    type Props = ComponentProps<typeof Badge> & {
        text?: string;
    };

    let { text = "Default Content", ...rest }: Props = $props();
</script>

<Badge {...rest}>
    {text}
</Badge>
