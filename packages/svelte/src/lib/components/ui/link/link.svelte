<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "../../../utils";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    /**
     * Styled anchor link component.
     *
     * @example
     * ```svelte
     * <Link href="/dashboard" variant="primary">Dashboard</Link>
     * ```
     */
    const linkVariants = cva("font-bold tracking-brutalist transition-all hover:opacity-80", {
        variants: {
            variant: {
                default: "text-foreground underline decoration-2 underline-offset-4",
                primary: "text-primary underline decoration-2 underline-offset-4",
                secondary: "text-secondary underline decoration-2 underline-offset-4",
                muted: "text-muted-foreground underline decoration-1 underline-offset-2",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    });

    type Props = HTMLAnchorAttributes &
        VariantProps<typeof linkVariants> & {
            children?: import("svelte").Snippet;
        };

    let {
        class: className,
        variant = "default",
        children,
        ...rest
    }: Props = $props();
</script>

<a class={cn(linkVariants({ variant, className }))} {...rest}>
    {@render children?.()}
</a>
