<script lang="ts">
    import { cn } from "../../../utils";

    type Props = {
        class?: string;
        value?: number;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        onchange?: (value: number) => void;
    };

    let {
        class: className,
        value = $bindable(0),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        onchange,
        ...rest
    }: Props = $props();

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        value = Number(target.value);
        onchange?.(value);
    }

    let percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div
    class={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
    )}
>
    <div
        class="relative h-4 w-full grow overflow-hidden rounded-full border-2 border-foreground bg-background shadow-inner"
    >
        <div
            class="absolute h-full bg-primary"
            style="width: {percentage}%"
        ></div>
    </div>
    <input
        type="range"
        {min}
        {max}
        {step}
        {disabled}
        bind:value
        oninput={handleInput}
        class="absolute h-4 w-full cursor-pointer opacity-0 accent-primary"
        {...rest}
    />
    <!-- Custom Thumb for visual consistency -->
    <div
        class={cn(
            "pointer-events-none absolute h-6 w-6 rounded-full border-2 border-foreground bg-foreground",
            disabled && "opacity-50",
        )}
        style="left: calc({percentage}% - 12px)"
    ></div>
</div>

<style>
    /* Ensure the native range input covers the whole area for accessibility/interaction */
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }
    /* Firefox */
    input[type="range"]::-moz-range-thumb {
        height: 24px;
        width: 24px;
        cursor: pointer;
        background: transparent;
        border: none;
    }
</style>
