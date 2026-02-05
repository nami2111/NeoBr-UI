<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { RadioGroup, RadioGroupItem, Label } from "@neobr/svelte";

    let value = $state("comfortable");
</script>

<DocPage
    title="Radio Group"
    description="A set of checkable buttons—known as radio buttons—where no more than one button can be checked at a time."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview
                code={`<RadioGroup bind:value>
    <div class="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label for="r1">Default</Label>
    </div>
    <div class="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label for="r2">Comfortable</Label>
    </div>
    <div class="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label for="r3">Compact</Label>
    </div>
</RadioGroup>`}
            >
                <div class="flex flex-col gap-4">
                    <RadioGroup bind:value>
                        <div class="flex items-center space-x-3">
                            <RadioGroupItem value="default" id="r1" />
                            <Label for="r1" class="cursor-pointer font-bold">Default Mode</Label>
                        </div>
                        <div class="flex items-center space-x-3">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label for="r2" class="cursor-pointer font-bold"
                                >Comfortable Space</Label
                            >
                        </div>
                        <div class="flex items-center space-x-3">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label for="r3" class="cursor-pointer font-bold">Compact View</Label>
                        </div>
                    </RadioGroup>
                    <p class="text-sm font-black tracking-tighter uppercase italic">
                        Selected System: {value}
                    </p>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
