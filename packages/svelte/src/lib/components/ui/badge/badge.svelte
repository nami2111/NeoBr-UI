<script lang="ts">
    import { type VariantProps, cva } from "class-variance-authority";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    const badgeVariants = cva(
        "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors",
        {
            variants: {
                variant: {
                    default:
                        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-sm",
                    secondary:
                        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    destructive:
                        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                    outline: "text-foreground",
                },
                brutalist: {
                    true: "rounded-none tracking-brutalist shadow-sm",
                    false: "rounded-full",
                },
            },
            defaultVariants: {
                variant: "default",
                brutalist: true,
            },
        },
    );

    type $$Props = HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof badgeVariants>;

    let className: $$Props["class"] = undefined;
    export { className as class };
    export let variant: $$Props["variant"] = "default";
    export let brutalist: $$Props["brutalist"] = true;
</script>

<div
    class={cn(badgeVariants({ variant, brutalist, className }))}
    {...$$restProps}
>
    <slot />
</div>
