<script lang="ts">
    import { type VariantProps, cva } from "class-variance-authority";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { cn, RADIUS, type Radius } from "../../../utils";

    const toggleVariants = cva(
        "inline-flex items-center justify-center text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer border-2 border-foreground",
        {
            variants: {
                variant: {
                    default:
                        "bg-background hover:bg-muted hover:text-muted-foreground",
                    outline:
                        "bg-transparent hover:bg-accent hover:text-accent-foreground",
                },
                size: {
                    default: "h-10 px-3",
                    sm: "h-9 px-2.5",
                    lg: "h-11 px-5",
                },
                radius: {
                    brutalist: RADIUS.brutalist,
                    soft: RADIUS.soft,
                    rounded: RADIUS.rounded,
                },
                pressed: {
                    true: "bg-primary text-primary-foreground shadow-inner translate-y-[var(--press-brutalist-sm)]",
                    false: "shadow-brutalist hover:-translate-y-[var(--lift-brutalist)] hover:shadow-brutalist-hover active:translate-y-[var(--press-brutalist)] active:shadow-none",
                },
            },
            defaultVariants: {
                variant: "default",
                size: "default",
                radius: "brutalist",
                pressed: false,
            },
        },
    );

    type Props = HTMLButtonAttributes &
        VariantProps<typeof toggleVariants> & {
            /**
             * Pressed state. Bindable.
             * @default false
             */
            pressed?: boolean;
            /**
             * Corner radius style: brutalist (sharp), soft (6px), or rounded (12px).
             * @default "brutalist"
             */
            radius?: Radius;
            /** Toggle content. */
            children?: import("svelte").Snippet;
        };

    let {
        class: className,
        variant = "default",
        size = "default",
        radius = "brutalist",
        pressed = $bindable(false),
        children,
        ...rest
    }: Props = $props();

    function toggle() {
        pressed = !pressed;
    }
</script>

<button
    type="button"
    aria-pressed={pressed}
    class={cn(toggleVariants({ variant, size, radius, pressed, className }))}
    onclick={toggle}
    {...rest}
>
    {@render children?.()}
</button>
