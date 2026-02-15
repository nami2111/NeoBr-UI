<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "../../../utils";
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
        "relative w-full border-2 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground shadow-sm",
        {
            variants: {
                variant: {
                    default: "bg-background text-foreground",
                    destructive:
                        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10",
                },
                brutalist: {
                    true: "rounded-brutalist shadow-brutalist",
                    false: "rounded-lg",
                },
            },
            defaultVariants: {
                variant: "default",
                brutalist: true,
            },
        },
    );

    type Props = HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & {
            /**
             * Enable Neo-Brutalist styling.
             * @default true
             */
            brutalist?: boolean;
            children?: import("svelte").Snippet;
        };

    let {
        class: className,
        variant = "default",
        brutalist = true,
        children,
        ...rest
    }: Props = $props();
</script>

<div role="alert" class={cn(alertVariants({ variant, brutalist, className }))} {...rest}>
    {@render children?.()}
</div>
