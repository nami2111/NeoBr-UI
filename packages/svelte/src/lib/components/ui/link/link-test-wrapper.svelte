<script lang="ts">
    import Link from "./link.svelte";
    import type { ComponentProps } from "svelte";

    type Props = ComponentProps<typeof Link> & {
        text?: string;
    };

    let { text = "Link", ...rest }: Props = $props();
</script>

<Link {...rest}>{text}</Link>
