<script lang="ts">
    import { cn } from "../../../utils";
    import { toast, type ToastItem } from "./toast-state.svelte.js";
    import { cva } from "class-variance-authority";
    import Icon from "../icon/icon.svelte";
    import { Cancel01Icon } from "@hugeicons/core-free-icons";

    const toastVariants = cva(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-brutalist border-2 border-foreground p-6 shadow-brutalist transition-all",
        {
            variants: {
                type: {
                    default: "bg-background text-foreground",
                    success: "bg-success text-success-foreground",
                    error: "bg-destructive text-destructive-foreground",
                    warning: "bg-warning text-warning-foreground",
                },
            },
            defaultVariants: {
                type: "default",
            },
        },
    );

    let { item }: { item: ToastItem } = $props();
</script>

<div class={cn(toastVariants({ type: item.type }))}>
    <div class="grid gap-1">
        {#if item.title}
            <div class="text-sm font-bold tracking-tight">{item.title}</div>
        {/if}
        <div class="text-xs font-medium opacity-90">{item.description}</div>
    </div>
    <button
        onclick={() => toast.dismiss(item.id)}
        class="text-foreground/50 hover:border-foreground hover:text-foreground focus-visible:ring-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none"
        aria-label="Close"
    >
        <Icon icon={Cancel01Icon} size={16} strokeWidth={3} />
    </button>
</div>
