<script lang="ts">
    import { type VariantProps, cva } from "class-variance-authority";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import { cn, RADIUS, type Radius } from "../../../utils";

/**
 * Button variants configuration using CVA.
 * Defines styles for different visual variants, sizes, and the brutalist theme.
 */
const buttonVariants = cva(
    "border-foreground shadow-brutalist hover:shadow-brutalist-hover inline-flex cursor-pointer items-center justify-center border-2 text-sm font-bold whitespace-nowrap transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary-hover",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
                success: "bg-success text-success-foreground hover:bg-success-hover",
                warning: "bg-warning text-warning-foreground hover:bg-warning-hover",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
                outline: "bg-background hover:bg-accent",
                ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
                link: "border-transparent text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
            radius: {
                brutalist: `${RADIUS.brutalist} tracking-brutalist`,
                soft: `${RADIUS.soft} tracking-brutalist`,
                rounded: `${RADIUS.rounded} tracking-brutalist`,
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            radius: "brutalist",
        },
    },
);

type Props = HTMLButtonAttributes &
    VariantProps<typeof buttonVariants> & {
        /**
         * Button radius style: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;

        /**
         * If provided, renders as an anchor tag (`<a>`) instead of a button.
         */
        href?: string;

        /**
         * Anchor target when rendering as a link.
         */
        target?: HTMLAnchorAttributes["target"];

        /**
         * Anchor rel when rendering as a link.
         */
        rel?: HTMLAnchorAttributes["rel"];

        /**
         * Content to be rendered inside the button.
         */
        children?: import("svelte").Snippet;

        /**
         * Additional CSS classes.
         */
        class?: string;
    };

let {
    class: className,
    variant = "default",
    size = "default",
    radius = "brutalist",
    href,
    children,
    ...rest
}: Props = $props();
</script>

{#if href}
    <a
        {href}
        class={cn(buttonVariants({ variant, size, radius, className }))}
        {...(rest as HTMLAnchorAttributes)}
    >
        {@render children?.()}
    </a>
{:else}
    <button class={cn(buttonVariants({ variant, size, radius, className }))} {...rest}>
        {@render children?.()}
    </button>
{/if}
