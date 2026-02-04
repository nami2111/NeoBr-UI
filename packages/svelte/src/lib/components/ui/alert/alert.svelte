<script lang="ts">
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

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
                    true: "rounded-none shadow-brutalist",
                    false: "rounded-lg",
                },
            },
            defaultVariants: {
                variant: "default",
                brutalist: true,
            },
        },
    );

    type $$Props = HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants>;

    let className: string | undefined = undefined;
    export { className as class };
    export let variant: $$Props["variant"] = "default";
    export let brutalist: $$Props["brutalist"] = true;
</script>

<div
    role="alert"
    class={cn(alertVariants({ variant, brutalist, className }))}
    {...$$restProps}
>
    <slot />
</div>
