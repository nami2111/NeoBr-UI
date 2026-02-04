<script lang="ts">
    import { cn } from "../../../utils";
    import { cva, type VariantProps } from "class-variance-authority";

    const switchVariants = cva(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        {
            variants: {
                variant: {
                    default: "bg-background data-[state=checked]:bg-primary",
                    destructive:
                        "bg-background data-[state=checked]:bg-destructive",
                    success: "bg-background data-[state=checked]:bg-success",
                },
            },
            defaultVariants: {
                variant: "default",
            },
        },
    );

    type Props = {
        class?: string;
        checked?: boolean;
        disabled?: boolean;
        variant?: VariantProps<typeof switchVariants>["variant"];
        onchange?: (checked: boolean) => void;
    };

    let {
        class: className,
        checked = $bindable(false),
        disabled = false,
        variant = "default",
        onchange,
        ...rest
    }: Props = $props();

    function toggle() {
        if (disabled) return;
        checked = !checked;
        onchange?.(checked);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
        }
    }
</script>

<button
    type="button"
    role="switch"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    {disabled}
    class={cn(switchVariants({ variant }), className)}
    onclick={toggle}
    onkeydown={handleKeyDown}
    {...rest}
>
    <span
        data-state={checked ? "checked" : "unchecked"}
        class={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-foreground shadow-lg transition-transform border border-foreground/10",
            checked ? "translate-x-5" : "translate-x-1",
        )}
    ></span>
</button>
