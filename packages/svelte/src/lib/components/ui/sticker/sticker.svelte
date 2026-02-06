<script lang="ts">
    import { cn } from "$lib/utils";
    import { onMount } from "svelte";

    interface Props {
        class?: string;
        rotation?: number;
        variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive";
        children?: import("svelte").Snippet;
    }

    let {
        class: className = undefined,
        rotation = undefined,
        variant = "default",
        children,
    }: Props = $props();

    // If rotation is provided, use it. Otherwise, use a stable random value for this instance.
    const randomRotation = Math.floor(Math.random() * 10) - 5;
    const finalRotation = $derived(rotation ?? randomRotation);

    const variants = {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground",
    };
</script>

<div
    class={cn(
        "border-foreground inline-block border-2 px-3 py-1 text-sm font-bold tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none",
        variants[variant],
        className,
    )}
    style="transform: rotate({finalRotation}deg);"
>
    {@render children?.()}
</div>
