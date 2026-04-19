<script lang="ts">
    import { DatePicker as DatePickerPrimitive } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { Calendar01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
    import type { CompatibleDatePickerProps } from "../../../types/bits-ui-compat";

    type Props = CompatibleDatePickerProps & {
        class?: string;
        label?: string;
    };

    let {
        class: className = undefined,
        label = undefined,
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
                    "input-brutalist focus-within:shadow-brutalist-hover flex h-10 w-full items-center px-3 transition-all",
                    className,
                )}
            >
                {#snippet children({ segments })}
                    {#each segments as { part, value: v }}
                        <DatePickerPrimitive.Segment
                            {part}
                            class="focus:bg-primary focus:text-primary-foreground data-[placeholder]:text-muted-foreground rounded-[2px] tabular-nums transition-colors outline-none focus:outline-none flex items-center justify-center"
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
            class="border-foreground bg-background shadow-brutalist rounded-brutalist z-50 mt-2 border-2 p-4"
        >
            <DatePickerPrimitive.Calendar>
                {#snippet children({ months, weekdays })}
                    <DatePickerPrimitive.Header class="flex items-center justify-between pb-4">
                        <DatePickerPrimitive.PrevButton
                            class="btn-brutalist flex h-8 w-8 items-center justify-center p-0"
                        >
                            <Icon icon={ArrowLeft01Icon} class="h-4 w-4" />
                        </DatePickerPrimitive.PrevButton>
                        <DatePickerPrimitive.Heading
                            class="text-sm font-black tracking-tighter uppercase"
                        />
                        <DatePickerPrimitive.NextButton
                            class="btn-brutalist flex h-8 w-8 items-center justify-center p-0"
                        >
                            <Icon icon={ArrowRight01Icon} class="h-4 w-4" />
                        </DatePickerPrimitive.NextButton>
                    </DatePickerPrimitive.Header>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        {#each months as month}
                            <DatePickerPrimitive.Grid class="w-full border-collapse select-none">
                                <DatePickerPrimitive.GridHead>
                                    <DatePickerPrimitive.GridRow
                                        class="mb-1 flex w-full justify-between"
                                    >
                                        {#each weekdays as day}
                                            <DatePickerPrimitive.HeadCell
                                                class="text-muted-foreground w-9 text-center text-[10px] font-black uppercase"
                                            >
                                                {day.slice(0, 2)}
                                            </DatePickerPrimitive.HeadCell>
                                        {/each}
                                    </DatePickerPrimitive.GridRow>
                                </DatePickerPrimitive.GridHead>
                                <DatePickerPrimitive.GridBody>
                                    {#each month.weeks as weekDates}
                                        <DatePickerPrimitive.GridRow
                                            class="flex w-full justify-between"
                                        >
                                            {#each weekDates as date}
                                                <DatePickerPrimitive.Cell
                                                    {date}
                                                    month={month.value}
                                                    class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
                                                >
                                                    <DatePickerPrimitive.Day
                                                        class={cn(
                                                            "rounded-brutalist hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center border-2 border-transparent p-0 font-bold transition-all",
                                                            "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-foreground",
                                                            "data-[today]:bg-muted data-[today]:text-foreground",
                                                            "data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50",
                                                            "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
                                                        )}
                                                    >
                                                        {date.day}
                                                    </DatePickerPrimitive.Day>
                                                </DatePickerPrimitive.Cell>
                                            {/each}
                                        </DatePickerPrimitive.GridRow>
                                    {/each}
                                </DatePickerPrimitive.GridBody>
                            </DatePickerPrimitive.Grid>
                        {/each}
                    </div>
                {/snippet}
            </DatePickerPrimitive.Calendar>
        </DatePickerPrimitive.Content>
    </div>
</DatePickerPrimitive.Root>
