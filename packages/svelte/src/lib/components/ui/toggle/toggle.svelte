<script lang="ts">
    import { type VariantProps, cva } from "class-variance-authority";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { cn } from "../../../utils";

    const toggleVariants = cva(
        "inline-flex items-center justify-center rounded-brutalist text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border-2 border-foreground",
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
                pressed: {
                    true: "bg-primary text-primary-foreground shadow-inner translate-y-[2px]",
                    false: "shadow-brutalist hover:-translate-y-[1px] hover:shadow-brutalist-hover active:translate-y-[2px] active:shadow-none",
                },
            },
            defaultVariants: {
                variant: "default",
                size: "default",
                pressed: false,
            },
        },
    );

    type Props = HTMLButtonAttributes &
        VariantProps<typeof toggleVariants> & {
            pressed?: boolean;
            children?: import("svelte").Snippet;
        };

    let {
        class: className,
        variant = "default",
        size = "default",
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
    class={cn(toggleVariants({ variant, size, pressed, className }))}
    onclick={toggle}
    {...rest}
>
    {@render children?.()}
</button>
