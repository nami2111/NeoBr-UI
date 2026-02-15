<script lang="ts">
    /**
     * Wrapper for Hugeicons components.
     *
     * @example
     * ```svelte
     * <Icon icon={Home01Icon} size={24} color="currentColor" />
     * ```
     */
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { cn } from "../../../utils";

    type Props = {
        /**
         * The icon component or object from @hugeicons/svelte
         */
        icon: any;

        /**
         * Size of the icon in pixels.
         * @default 24
         */
        size?: number | string;

        /**
         * Color of the icon.
         * @default "currentColor"
         */
        color?: string;

        /**
         * Stroke width of the icon lines.
         * @default 1.5
         */
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
