<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    /**
     * Alert component for displaying important messages.
     *
     * @example
     * ```svelte
     * <Alert variant="destructive">
     *   <Icon name="alert-circle" />
     *   <AlertTitle>Error</AlertTitle>
     *   <AlertDescription>Something went wrong.</AlertDescription>
     * </Alert>
     * ```
     */
    const alertVariants = cva(
        "relative w-full border-2 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        {
            variants: {
                variant: {
                    default: "bg-background text-foreground",
                    destructive:
                        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10",
                },
                radius: {
                    brutalist: `${RADIUS.brutalist} shadow-brutalist`,
                    soft: `${RADIUS.soft} shadow-brutalist`,
                    rounded: `${RADIUS.rounded} shadow-brutalist`,
                },
            },
            defaultVariants: {
                variant: "default",
                radius: "brutalist",
            },
        },
    );

    type Props = HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & {
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

<div role="alert" class={cn(alertVariants({ variant, radius, className }))} {...rest}>
    {@render children?.()}
</div>
