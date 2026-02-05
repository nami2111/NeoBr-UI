<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Select, SelectTrigger, SelectContent, SelectItem } from "@neobr/svelte";

    let value = $state("");
</script>

<DocPage
    title="Select"
    description="Displays a list of options for the user to pick from—triggered by a button."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview
                code={`<Select bind:value>
    <SelectTrigger>
        {value ? value.charAt(0).toUpperCase() + value.slice(1) : "Select a fruit"}
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectContent>
</Select>`}
            >
                <div class="flex items-center justify-center py-10">
                    <div class="w-[200px]">
                        <Select bind:value>
                            <SelectTrigger>
                                <span class="font-bold tracking-tighter uppercase">
                                    {value
                                        ? value.charAt(0).toUpperCase() + value.slice(1)
                                        : "Select a fruit"}
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
