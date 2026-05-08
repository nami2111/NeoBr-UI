<script lang="ts">
    import { Calendar as CalendarPrimitive } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
    import type { CompatibleCalendarProps, SimpleDateValue } from "../../../types/bits-ui-compat";

    type Props = CompatibleCalendarProps<"single" | "multiple"> & {
        class?: string;
    };

    let { value = $bindable(), type = "single", class: className, ...rest }: Props = $props();
</script>

<CalendarPrimitive.Root
    bind:value={value as any}
    {type}
    class={cn("container-brutalist w-fit p-4", className)}
    {...rest as any}
>
    {#snippet children({ months, weekdays })}
        <!-- NOTE: Calendar grid rendering is duplicated between this component and date-picker.svelte.
             Deduplication requires extracting shared rendering that accepts bits-ui primitives
             (Calendar.Grid vs DatePicker.Calendar.Grid) as props while preserving context inheritance. -->
        <CalendarPrimitive.Header class="flex items-center justify-between pb-4">
            <CalendarPrimitive.PrevButton
                class="btn-brutalist flex h-8 w-8 items-center justify-center p-0"
            >
                <Icon icon={ArrowLeft01Icon} class="h-4 w-4" />
            </CalendarPrimitive.PrevButton>
            <CalendarPrimitive.Heading class="text-sm font-black tracking-tighter uppercase" />
            <CalendarPrimitive.NextButton
                class="btn-brutalist flex h-8 w-8 items-center justify-center p-0"
            >
                <Icon icon={ArrowRight01Icon} class="h-4 w-4" />
            </CalendarPrimitive.NextButton>
        </CalendarPrimitive.Header>

        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {#each months as month}
                <CalendarPrimitive.Grid class="w-full border-collapse select-none">
                    <CalendarPrimitive.GridHead>
                        <CalendarPrimitive.GridRow class="mb-1 flex w-full justify-between">
                            {#each weekdays as day}
                                <CalendarPrimitive.HeadCell
                                    class="text-muted-foreground w-9 text-center text-[10px] font-black uppercase"
                                >
                                    {day.slice(0, 2)}
                                </CalendarPrimitive.HeadCell>
                            {/each}
                        </CalendarPrimitive.GridRow>
                    </CalendarPrimitive.GridHead>
                    <CalendarPrimitive.GridBody>
                        {#each month.weeks as weekDates}
                            <CalendarPrimitive.GridRow class="flex w-full justify-between">
                                {#each weekDates as date}
                                    <CalendarPrimitive.Cell
                                        {date}
                                        month={month.value}
                                        class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
                                    >
                                        <CalendarPrimitive.Day
                                            class={cn(
                                                "rounded-brutalist hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center border-2 border-transparent p-0 font-bold transition-all",
                                                "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-foreground",
                                                "data-[today]:bg-muted data-[today]:text-foreground",
                                                "data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50",
                                                "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
                                                "data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground",
                                                "active:scale-95",
                                            )}
                                        >
                                            {date.day}
                                        </CalendarPrimitive.Day>
                                    </CalendarPrimitive.Cell>
                                {/each}
                            </CalendarPrimitive.GridRow>
                        {/each}
                    </CalendarPrimitive.GridBody>
                </CalendarPrimitive.Grid>
            {/each}
        </div>
    {/snippet}
</CalendarPrimitive.Root>
