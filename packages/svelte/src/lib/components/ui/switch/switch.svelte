<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";

    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = HTMLButtonAttributes & {
        checked?: boolean;
        variant?: "default" | "destructive" | "success";
        radius?: Radius;
        onchange?: (checked: boolean) => void;
    };

    let {
        class: className,
        checked = $bindable(false),
        disabled = false,
        variant = "default",
        radius = "brutalist",
        onchange,
        ...rest
    }: Props = $props();

    const variantClasses = {
        default: "data-[state=checked]:bg-primary",
        destructive: "data-[state=checked]:bg-destructive",
        success: "data-[state=checked]:bg-success",
    };

    function toggle() {
        if (disabled) return;
        checked = !checked;
        onchange?.(checked);
    }
</script>

<button
    type="button"
    role="switch"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    {disabled}
    class={cn(
        "peer border-foreground bg-background focus-visible:ring-ring focus-visible:ring-offset-background shadow-brutalist inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        RADIUS[radius],
        className,
    )}
    onclick={toggle}
    {...rest}
>
    <span
        data-state={checked ? "checked" : "unchecked"}
        class={cn(
            "bg-foreground border-foreground/10 pointer-events-none block h-4 w-4 rounded-full border shadow-lg transition-transform",
            checked ? "translate-x-5" : "translate-x-1",
        )}
    ></span>
</button>
