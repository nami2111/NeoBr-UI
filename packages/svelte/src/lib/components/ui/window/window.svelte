<script lang="ts">
    import { cn, RADIUS, type Radius } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";
    import Icon from "../icon/icon.svelte";
    import { Cancel01Icon, MinusSignIcon, SquareIcon } from "@hugeicons/core-free-icons";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /** Title shown in the window's title bar. */
        title?: string;
        /**
         * Show a close control.
         * @default false
         */
        closable?: boolean;
        /**
         * Show a minimize control.
         * @default false
         */
        minimizable?: boolean;
        /**
         * Show a maximize control.
         * @default false
         */
        maximizable?: boolean;
        /** Called when the close control is activated. */
        onClose?: () => void;
        /** Called when the minimize control is activated. */
        onMinimize?: () => void;
        /** Called when the maximize control is activated. */
        onMaximize?: () => void;
        /** Window body content. */
        children?: import("svelte").Snippet;
        /**
         * Corner radius: brutalist (sharp), soft (6px), or rounded (12px).
         * @default "brutalist"
         */
        radius?: Radius;
    }

    let {
        class: className = undefined,
        title = "Window",
        closable = true,
        minimizable = true,
        maximizable = true,
        children,
        onClose = undefined,
        onMinimize = undefined,
        onMaximize = undefined,
        radius = "brutalist",
        ...rest
    }: Props = $props();
</script>

<div
    class={cn(
        "bg-background border-foreground shadow-brutalist overflow-hidden border-2 p-0",
        RADIUS[radius],
        className,
    )}
    {...rest}
>
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
                    onclick={onMinimize}
                    class="border-foreground bg-background hover:bg-muted text-foreground flex h-5 w-5 items-center justify-center border-2 text-[10px] font-bold shadow-brutalist transition-all active:translate-y-[var(--press-brutalist-sm)] active:shadow-none"
                >
                    <Icon icon={MinusSignIcon} size={12} strokeWidth={3} />
                </button>
            {/if}
            {#if maximizable}
                <button
                    aria-label="Maximize"
                    onclick={onMaximize}
                    class="border-foreground bg-background hover:bg-muted text-foreground flex h-5 w-5 items-center justify-center border-2 text-[10px] font-bold shadow-brutalist transition-all active:translate-y-[var(--press-brutalist-sm)] active:shadow-none"
                >
                    <Icon icon={SquareIcon} size={12} strokeWidth={3} />
                </button>
            {/if}
            {#if closable}
                <button
                    aria-label="Close"
                    onclick={onClose}
                    class="border-foreground bg-destructive text-destructive-foreground hover:bg-destructive-hover flex h-5 w-5 items-center justify-center border-2 text-[10px] font-bold shadow-brutalist transition-all active:translate-y-[var(--press-brutalist-sm)] active:shadow-none"
                >
                    <Icon icon={Cancel01Icon} size={12} strokeWidth={3} />
                </button>
            {/if}
        </div>
    </div>
    <!-- Content -->
    <div class="p-6">
        {@render children?.()}
    </div>
</div>
