<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Calendar, Badge } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";

    let value = $state(today(getLocalTimeZone()));

    const basicUsage = "<" + `script lang="ts">
    import { Calendar } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";

    let value = $state(today(getLocalTimeZone()));
</` + `script>

<Calendar type="single" bind:value />`;

    const fixedWeeksUsage = `<Calendar type="single" bind:value fixedWeeks />`;
</script>

<DocPage
    title="Calendar"
    description="Displays dates and days of the week, facilitating date-related interactions."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <p class="text-muted-foreground text-sm">
                Bind a single date by default. Use
                <code class="bg-muted rounded px-1.5 py-0.5">type="multiple"</code> when binding a
                date array.
            </p>
            <CodePreview code={basicUsage}>
                <div class="flex flex-col items-center justify-center gap-4">
                    <Calendar type="single" bind:value />
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold tracking-tight uppercase">Selected:</span>
                        <Badge variant="default">{value?.toString()}</Badge>
                    </div>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Fixed Weeks</h2>
            <CodePreview code={fixedWeeksUsage}>
                <div class="flex flex-col items-center justify-center">
                    <Calendar type="single" bind:value fixedWeeks />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
