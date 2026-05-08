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

    type Props = VariantProps<typeof loadingVariants> &
        HTMLAttributes<HTMLDivElement> & {
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
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
        <!-- 4 Blocks with Staggered Tail Animation -->
        <rect
            x="2"
            y="2"
            width="9"
            height="9"
            fill="currentColor"
            class="animate-neobr-tail"
            style="animation-delay: 0s;"
        />
        <rect
            x="13"
            y="2"
            width="9"
            height="9"
            fill="currentColor"
            class="animate-neobr-tail"
            style="animation-delay: 0.2s;"
        />
        <rect
            x="13"
            y="13"
            width="9"
            height="9"
            fill="currentColor"
            class="animate-neobr-tail"
            style="animation-delay: 0.4s;"
        />
        <rect
            x="2"
            y="13"
            width="9"
            height="9"
            fill="currentColor"
            class="animate-neobr-tail"
            style="animation-delay: 0.6s;"
        />
    </svg>
</div>
