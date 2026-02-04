<script lang="ts">
    import { cn } from "../../../utils";
    import { toast, type ToastItem } from "./toast.svelte.ts";
    import { cva } from "class-variance-authority";

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
        class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-transparent text-foreground/50 transition-colors hover:border-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Close"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="miter"
        >
            <path d="M18 6 6 18M6 6l12 12" />
        </svg>
    </button>
</div>
