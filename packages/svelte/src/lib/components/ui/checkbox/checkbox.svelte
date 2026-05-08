<script lang="ts">
    import { scale } from "svelte/transition";
    import { cn } from "../../../utils";
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = Omit<HTMLInputAttributes, "type"> & {
        checked?: boolean;
        disabled?: boolean;
        id?: string;
    };

    let {
        checked = $bindable(false),
        disabled = false,
        class: className,
        id,
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
            "flex h-full w-full items-center justify-center rounded-[2px] border-2 border-foreground bg-background transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:opacity-50",
            checked && "bg-primary text-primary-foreground",
        )}
    >
        {#if checked}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="square"
                stroke-linejoin="miter"
                transition:scale={{ duration: 150 }}
            >
                <path d="M20 6L9 17L4 12" />
            </svg>
        {/if}
    </div>
</div>
