<script lang="ts">
    import { DatePicker as DatePickerPrimitive } from "bits-ui";
    import { cn, RADIUS, type Radius } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { Calendar01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
    import type { CompatibleDatePickerProps } from "../../../types/bits-ui-compat";
    import CalendarGrid from "../calendar/calendar-grid.svelte";

    type Props = CompatibleDatePickerProps & {
        class?: string;
        label?: string;
        radius?: Radius;
    };

    let {
        class: className = undefined,
        label = undefined,
        radius = "brutalist",
        value = $bindable(),
        ...rest
    }: Props = $props();
</script>

<DatePickerPrimitive.Root bind:value {...rest}>
    <div class="text-foreground flex flex-col gap-1.5">
        {#if label}
            <DatePickerPrimitive.Label class="text-xs font-black tracking-tight uppercase">
                {label}
            </DatePickerPrimitive.Label>
        {/if}
        <div class={cn("relative w-full", className)}>
            <DatePickerPrimitive.Input
                class={cn(
                    "border-foreground bg-background focus-within:shadow-brutalist-hover flex h-10 w-full items-center border-2 px-3 py-2 text-sm font-bold shadow-inner transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    RADIUS[radius],
                    className,
                )}
            >
                {#snippet children({ segments })}
                    {#each segments as { part, value: v }, index (`${part}-${index}`)}
                        <DatePickerPrimitive.Segment
                            {part}
                            class="focus:bg-primary focus:text-primary-foreground data-[placeholder]:text-muted-foreground rounded-[2px] tabular-nums transition-colors outline-none focus-visible:outline-none flex items-center justify-center"
                        >
                            {v}
                        </DatePickerPrimitive.Segment>
                    {/each}
                    <DatePickerPrimitive.Trigger
                        class="text-muted-foreground hover:text-foreground ml-auto cursor-pointer transition-colors outline-none flex items-center justify-center"
                    >
                        <div class="flex items-center justify-center">
                            <Icon icon={Calendar01Icon} class="h-5 w-5" />
                        </div>
                    </DatePickerPrimitive.Trigger>
                {/snippet}
            </DatePickerPrimitive.Input>
        </div>
        <DatePickerPrimitive.Content
            sideOffset={6}
            class="border-foreground bg-background shadow-brutalist rounded-brutalist mt-2 border-2 p-4"
            style="z-index: var(--z-popover)"
        >
            <DatePickerPrimitive.Calendar>
                {#snippet children({ months, weekdays })}
                    <DatePickerPrimitive.Header class="flex items-center justify-between pb-4">
                        <DatePickerPrimitive.PrevButton
                            class="border-foreground shadow-brutalist hover:shadow-brutalist-hover rounded-brutalist flex h-8 w-8 cursor-pointer items-center justify-center border-2 p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none"
                        >
                            <Icon icon={ArrowLeft01Icon} class="h-4 w-4" />
                        </DatePickerPrimitive.PrevButton>
                        <DatePickerPrimitive.Heading
                            class="text-sm font-black tracking-tighter uppercase"
                        />
                        <DatePickerPrimitive.NextButton
                            class="border-foreground shadow-brutalist hover:shadow-brutalist-hover rounded-brutalist flex h-8 w-8 cursor-pointer items-center justify-center border-2 p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none"
                        >
                            <Icon icon={ArrowRight01Icon} class="h-4 w-4" />
                        </DatePickerPrimitive.NextButton>
                    </DatePickerPrimitive.Header>
                    <CalendarGrid {months} {weekdays} />
                {/snippet}
            </DatePickerPrimitive.Calendar>
        </DatePickerPrimitive.Content>
    </div>
</DatePickerPrimitive.Root>
