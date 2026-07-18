<script lang="ts">
    import { Calendar as CalendarPrimitive, type CalendarRootSnippetProps } from "bits-ui";
    import { cn } from "../../../utils";

    /** Renders the month grid for `Calendar`. Receives `months`/`weekdays` from the bits-ui root snippet. */
    type Props = CalendarRootSnippetProps;

    let { months, weekdays }: Props = $props();
</script>

<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    {#each months as month (month.value.toString())}
        <CalendarPrimitive.Grid class="w-full border-collapse select-none">
            <CalendarPrimitive.GridHead>
                <CalendarPrimitive.GridRow class="mb-1 flex w-full justify-between">
                    {#each weekdays as day, weekdayIndex (`${day}-${weekdayIndex}`)}
                        <CalendarPrimitive.HeadCell
                            class="text-muted-foreground w-9 text-center text-[10px] font-black uppercase"
                        >
                            {day.slice(0, 2)}
                        </CalendarPrimitive.HeadCell>
                    {/each}
                </CalendarPrimitive.GridRow>
            </CalendarPrimitive.GridHead>
            <CalendarPrimitive.GridBody>
                {#each month.weeks as weekDates (weekDates.map((date) => date.toString()).join("|"))}
                    <CalendarPrimitive.GridRow class="flex w-full justify-between">
                        {#each weekDates as date (date.toString())}
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
