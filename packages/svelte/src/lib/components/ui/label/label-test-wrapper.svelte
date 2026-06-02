<script lang="ts">
    import Label from "./label.svelte";
    import type { ComponentProps } from "svelte";

    type Props = ComponentProps<typeof Label> & {
        text?: string;
    };

    let { text = "Label", ...rest }: Props = $props();
</script>

<Label {...rest}>{text}</Label>
