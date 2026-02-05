<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Toggle, Icon } from "@neobr/svelte";
    import { CheckmarkCircle01Icon, StarIcon } from "@hugeicons/core-free-icons";

    let pressed = $state(false);
</script>

<DocPage title="Toggle" description="A two-state button that can be either on or off.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={`<Toggle><Icon icon={CheckmarkCircle01Icon} /></Toggle>`}>
                <div class="flex items-center gap-4">
                    <Toggle aria-label="Toggle check" bind:pressed>
                        <Icon icon={CheckmarkCircle01Icon} class="mr-2 h-4 w-4" />
                        Check
                    </Toggle>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Outline</h2>
            <CodePreview
                code={`<Toggle variant="outline" aria-label="Toggle star"><Icon icon={StarIcon} /></Toggle>`}
            >
                <Toggle variant="outline" aria-label="Toggle star">
                    <Icon icon={StarIcon} class="mr-2 h-4 w-4" />
                    Outline Star
                </Toggle>
            </CodePreview>
        </section>
    </div>
</DocPage>
