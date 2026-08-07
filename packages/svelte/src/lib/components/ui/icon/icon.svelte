<script lang="ts">
    /**
     * Wrapper for Hugeicons components.
     *
     * @example
     * ```svelte
     * <Icon icon={Home01Icon} size={24} color="currentColor" />
     * ```
     */
    import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/svelte";
    import { cn } from "../../../utils";
    import type { ComponentProps } from "svelte";

    type HugeiconsIconProps = ComponentProps<typeof HugeiconsIcon>;

    type Props = Omit<HugeiconsIconProps, "icon" | "size" | "color" | "strokeWidth" | "class"> & {
        /**
         * The icon object from @hugeicons/core-free-icons.
         */
        icon: IconSvgElement;

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
    <!-- className is forwarded to the SVG too: CSS size utilities (e.g.
         `h-4 w-4`) override the `width`/`height` attributes, so class-driven
         sizing actually shrinks the glyph — the wrapper alone used to render
         a 24px SVG overflowing a 16px box. -->
    <HugeiconsIcon
        {icon}
        size={Number(size)}
        {color}
        {strokeWidth}
        class={className}
        {...rest}
    />
</div>
