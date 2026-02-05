<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { ToggleGroup, ToggleGroupItem, Icon } from "@neobr/svelte";
    import {
        LeftToRightListBulletIcon,
        ListViewIcon,
        RightToLeftListBulletIcon,
    } from "@hugeicons/core-free-icons";

    let singleValue = $state("bold");
    let multipleValue = $state(["italic"]);
</script>

<DocPage
    title="Toggle Group"
    description="A set of two-state buttons that can be toggled on or off."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Single</h2>
            <CodePreview
                code={`<ToggleGroup type="single" bind:value={singleValue}>
    <ToggleGroupItem value="left"><Icon icon={LeftToRightListBulletIcon} /></ToggleGroupItem>
    <ToggleGroupItem value="center"><Icon icon={ListViewIcon} /></ToggleGroupItem>
    <ToggleGroupItem value="right"><Icon icon={RightToLeftListBulletIcon} /></ToggleGroupItem>
</ToggleGroup>`}
            >
                <div class="flex flex-col items-center gap-4">
                    <ToggleGroup type="single" bind:value={singleValue}>
                        <ToggleGroupItem value="left" aria-label="Align left">L</ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Align center">
                            C
                        </ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Align right">R</ToggleGroupItem>
                    </ToggleGroup>
                    <p class="text-sm font-bold italic">Selected: {singleValue}</p>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Multiple</h2>
            <CodePreview
                code={`<ToggleGroup type="multiple" bind:value={multipleValue}>
    <ToggleGroupItem value="bold">B</ToggleGroupItem>
    <ToggleGroupItem value="italic">I</ToggleGroupItem>
    <ToggleGroupItem value="underline">U</ToggleGroupItem>
</ToggleGroup>`}
            >
                <div class="flex flex-col items-center gap-4">
                    <ToggleGroup type="multiple" bind:value={multipleValue}>
                        <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Underline">
                            U
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <p class="text-sm font-bold italic">Selected: {multipleValue.join(", ")}</p>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
