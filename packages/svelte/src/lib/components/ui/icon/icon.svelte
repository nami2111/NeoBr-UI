<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { cn } from "../../../utils";

    type Props = {
        icon: any; // IconSvgObject
        size?: number | string;
        color?: string;
        strokeWidth?: number;
        class?: string;
        [key: string]: any;
    };

    let {
        icon,
        size = 24,
        color = "currentColor",
        strokeWidth = 1.5,
        class: className,
        ...rest
    }: Props = $props();
</script>

<div class={cn("inline-flex shrink-0 items-center justify-center", className)}>
    <HugeiconsIcon {icon} size={Number(size)} {color} {strokeWidth} {...rest} />
</div>
