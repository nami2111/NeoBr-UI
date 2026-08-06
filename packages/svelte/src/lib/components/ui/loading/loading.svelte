<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "../../../utils";

    const loadingVariants = cva("", {
        variants: {
            variant: {
                default: "text-primary",
                secondary: "text-secondary",
                muted: "text-muted-foreground",
            },
            size: {
                sm: "h-4 w-4",
                default: "h-6 w-6",
                lg: "h-8 w-8",
                xl: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    });

    import type { HTMLAttributes } from "svelte/elements";

    /** Animated loading spinner. `variant` sets color, `size` sets dimensions. */
    type Props = VariantProps<typeof loadingVariants> &
        HTMLAttributes<HTMLDivElement> & {
            /** Additional classes for the spinner. */
            class?: string;
        };

    let { class: className, variant = "default", size = "default", ...rest }: Props = $props();
</script>

<div
    role="status"
    aria-label="Loading"
    class={cn("relative inline-block", loadingVariants({ variant, size, className }))}
    {...rest}
>
    <span class="grid h-full w-full grid-cols-2 gap-[12.5%]">
        <span class="animate-neobr-tail bg-current" style="animation-delay: 0s;"></span>
        <span class="animate-neobr-tail bg-current" style="animation-delay: 0.2s;"></span>
        <span class="animate-neobr-tail bg-current" style="animation-delay: 0.6s;"></span>
        <span class="animate-neobr-tail bg-current" style="animation-delay: 0.4s;"></span>
    </span>
</div>
