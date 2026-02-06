<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { DatePicker, Badge } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";

    let value = $state(today(getLocalTimeZone()));

    const basicUsage = `<script lang="ts">
    import { DatePicker } from "@neobr/svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";

    let value = $state(today(getLocalTimeZone()));
<\/script>

<DatePicker bind:value label="Pick a Date" />`;
</script>

<DocPage
    title="Date Picker"
    description="Enables users to select dates using an input field and calendar interface."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Basic Usage</h2>
            <CodePreview code={basicUsage}>
                <div class="mx-auto max-w-xs sm:mx-0">
                    <DatePicker bind:value label="Event Date" />
                    <div class="mt-4 flex items-center gap-2">
                        <span class="text-[10px] font-black tracking-tighter uppercase"
                            >Current Value:</span
                        >
                        <Badge variant="secondary">{value?.toString()}</Badge>
                    </div>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
