<script lang="ts">
    import { Calendar as CalendarPrimitive } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
    import type { CompatibleCalendarProps, SimpleDateValue } from "../../../types/bits-ui-compat";
    import CalendarGrid from "./calendar-grid.svelte";

    type Props = CompatibleCalendarProps & {
        class?: string;
    };

    let { value = $bindable(), type = "single", class: className, ...rest }: Props = $props();
</script>

<CalendarPrimitive.Root
    bind:value={value as never}
    {type}
    class={cn("container-brutalist w-fit p-4", className)}
    {...(rest as Record<string, unknown>)}
>
    {#snippet children({ months, weekdays })}
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

        <CalendarGrid {months} {weekdays} />
    {/snippet}
</CalendarPrimitive.Root>
