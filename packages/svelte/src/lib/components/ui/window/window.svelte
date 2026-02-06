<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        title?: string;
        closable?: boolean;
        minimizable?: boolean;
        maximizable?: boolean;
        onClose?: () => void;
        children?: import("svelte").Snippet;
    }

    let {
        class: className = undefined,
        title = "Window",
        closable = true,
        minimizable = true,
        maximizable = true,
        children,
        onClose = undefined,
        ...rest
    }: Props = $props();
</script>

<div class={cn("container-brutalist overflow-hidden p-0", className)} {...rest}>
    <!-- Title Bar -->
    <div class="border-foreground bg-primary flex items-center justify-between border-b-2 p-2 px-3">
        <div class="flex items-center gap-2">
            <span class="text-primary-foreground text-sm font-bold tracking-wider uppercase"
                >{title}</span
            >
        </div>
        <div class="flex items-center gap-2">
            {#if minimizable}
                <button
                    aria-label="Minimize"
                    class="border-foreground bg-background hover:bg-muted h-5 w-5 border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                ></button>
            {/if}
            {#if maximizable}
                <button
                    aria-label="Maximize"
                    class="border-foreground bg-background hover:bg-muted h-5 w-5 border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                ></button>
            {/if}
            {#if closable}
                <button
                    aria-label="Close"
                    onclick={onClose}
                    class="border-foreground bg-destructive text-destructive-foreground hover:bg-destructive-hover flex h-5 w-5 items-center justify-center border-2 text-[10px] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                    ✕
                </button>
            {/if}
        </div>
    </div>
    <!-- Content -->
    <div class="p-6">
        {@render children?.()}
    </div>
</div>
