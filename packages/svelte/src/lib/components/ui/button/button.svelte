<script lang="ts">
    import { type VariantProps, cva } from "class-variance-authority";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import { cn } from "../../../utils";

/**
 * Button variants configuration using CVA.
 * Defines styles for different visual variants, sizes, and the brutalist theme.
 */
const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary-hover border-2",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive-hover border-2",
                success:
                    "bg-success text-success-foreground hover:bg-success-hover border-2",
                warning:
                    "bg-warning text-warning-foreground hover:bg-warning-hover border-2",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary-hover border-2",
                outline: "btn-brutalist border-2 bg-background hover:bg-accent",
                ghost: "hover:bg-accent hover:text-accent-foreground border-2 border-transparent",
                link: "text-primary underline-offset-4 hover:underline border-2 border-transparent",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
            radius: {
                brutalist: "btn-brutalist rounded-none tracking-[0.1em]",
                soft: "btn-brutalist-soft rounded-[6px] tracking-[0.1em]",
                rounded: "btn-brutalist-rounded rounded-[12px] tracking-[0.1em]",
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
        radius?: "brutalist" | "soft" | "rounded";

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
