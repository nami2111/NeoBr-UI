<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn, type Radius } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /**
     * Small status indicator or label.
     *
     * @example
     * ```svelte
     * <Badge variant="default">New</Badge>
     * <Badge variant="secondary">In Progress</Badge>
     * ```
     */
    const badgeVariants = cva(
        "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        {
            variants: {
                variant: {
                    default:
                        "border-foreground bg-primary text-primary-foreground hover:bg-primary-hover",
                    secondary:
                        "border-foreground bg-secondary text-secondary-foreground hover:bg-secondary-hover",
                    destructive:
                        "border-foreground bg-destructive text-destructive-foreground hover:bg-destructive-hover",
                    outline: "border-foreground text-foreground bg-background",
                },
                radius: {
                    brutalist: "rounded-brutalist",
                    soft: "rounded-brutalist-soft",
                    rounded: "rounded-brutalist-rounded",
                },
            },
            defaultVariants: {
                variant: "default",
                radius: "brutalist",
            },
        },
    );

    type Props = HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof badgeVariants> & {
            /**
             * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
             * @default "brutalist"
             */
            radius?: Radius;
            children?: import("svelte").Snippet;
        };

    let {
        class: className,
        variant = "default",
        radius = "brutalist",
        children,
        ...rest
    }: Props = $props();
</script>

<div class={cn(badgeVariants({ variant, radius, className }))} {...rest}>
    {@render children?.()}
</div>
