<script lang="ts">
    import { scale } from "svelte/transition";
    import { cn, RADIUS, type Radius } from "../../../utils";
    import { TRANSITION_BRUTALIST } from "../../../utils/motion";
    import type { HTMLInputAttributes } from "svelte/elements";
    import Icon from "../icon/icon.svelte";
    import { Tick02Icon } from "@hugeicons/core-free-icons";

    type Props = Omit<HTMLInputAttributes, "type"> & {
        checked?: boolean;
        disabled?: boolean;
        id?: string;
        radius?: Radius;
    };

    let {
        checked = $bindable(false),
        disabled = false,
        class: className,
        id,
        radius = "brutalist",
        ...rest
    }: Props = $props();
</script>

<div class={cn("relative flex items-center h-6 w-6 shrink-0", className)}>
    <input
        type="checkbox"
        bind:checked
        {disabled}
        {id}
        class="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...rest}
    />
    <div
        class={cn(
            "flex h-full w-full items-center justify-center border-2 border-foreground bg-background transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-50",
            RADIUS[radius],
            checked && "bg-primary text-primary-foreground",
        )}
    >
        {#if checked}
            <span transition:scale={TRANSITION_BRUTALIST}>
                <Icon icon={Tick02Icon} size={18} strokeWidth={4} />
            </span>
        {/if}
    </div>
</div>
