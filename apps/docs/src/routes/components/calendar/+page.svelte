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

    const readOnlyUsage = `<Calendar type="single" readonly />`;
</script>

<DocPage
    title="Calendar"
    description="Displays dates and days of the week, facilitating date-related interactions."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Basic Usage</h2>
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
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Read Only</h2>
            <CodePreview code={readOnlyUsage}>
                <div class="flex flex-col items-center justify-center">
                    <Calendar type="single" readonly />
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
