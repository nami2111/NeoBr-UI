<script lang="ts">
    import { Calendar as CalendarPrimitive } from "bits-ui";
    import { cn } from "../../../utils";
    import Icon from "../icon/icon.svelte";
    import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
    import type { CompatibleCalendarProps } from "../../../types/bits-ui-compat";
    import CalendarGrid from "./calendar-grid.svelte";

    type Props = CompatibleCalendarProps & {
        class?: string;
    };

    let { value = $bindable(), type = "single", class: className, ...rest }: Props = $props();
</script>

<CalendarPrimitive.Root
    bind:value={value as never}
    {type}
    class={cn(
        "bg-background border-foreground shadow-brutalist rounded-brutalist w-fit border-2 p-4",
        className,
    )}
    {...(rest as Record<string, unknown>)}
>
    {#snippet children({ months, weekdays })}
        <CalendarPrimitive.Header class="flex items-center justify-between pb-4">
            <CalendarPrimitive.PrevButton
                class="border-foreground shadow-brutalist hover:shadow-brutalist-hover rounded-brutalist flex h-8 w-8 cursor-pointer items-center justify-center border-2 p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none"
            >
                <Icon icon={ArrowLeft01Icon} class="h-4 w-4" />
            </CalendarPrimitive.PrevButton>
            <CalendarPrimitive.Heading class="text-sm font-black tracking-tighter uppercase" />
            <CalendarPrimitive.NextButton
                class="border-foreground shadow-brutalist hover:shadow-brutalist-hover rounded-brutalist flex h-8 w-8 cursor-pointer items-center justify-center border-2 p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] active:translate-y-[var(--press-brutalist)] active:shadow-none"
            >
                <Icon icon={ArrowRight01Icon} class="h-4 w-4" />
            </CalendarPrimitive.NextButton>
        </CalendarPrimitive.Header>

        <CalendarGrid {months} {weekdays} />
    {/snippet}
</CalendarPrimitive.Root>
