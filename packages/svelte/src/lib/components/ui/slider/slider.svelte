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
        [key: string]: any;
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

<div class={cn("relative flex w-full touch-none items-center select-none", className)}>
    <div
        class="rounded-brutalist border-foreground bg-background relative h-4 w-full grow overflow-hidden border-2 shadow-inner"
    >
        <div class="bg-primary absolute h-full" style="width: {percentage}%"></div>
    </div>
    <input
        type="range"
        {min}
        {max}
        {step}
        {disabled}
        bind:value
        oninput={handleInput}
        class="accent-primary absolute h-4 w-full cursor-pointer opacity-0"
        {...rest}
    />
    <!-- Custom Thumb for visual consistency -->
    <div
        class={cn(
            "rounded-brutalist border-foreground bg-foreground pointer-events-none absolute h-6 w-6 border-2",
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
