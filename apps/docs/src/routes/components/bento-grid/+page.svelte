<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { BentoGrid, BentoGridItem, Icon } from "@neobr/svelte";
    import {
        Files01Icon,
        Note01Icon,
        SignatureIcon,
        TableIcon,
        BubbleChatIcon,
        Image01Icon,
        Settings01Icon,
    } from "@hugeicons/core-free-icons";

    const basicUsage = `<BentoGrid class="max-w-4xl mx-auto">
    <BentoGridItem
        title="Innovation"
        description="Explore the birth of new ideas."
        header={header1}
        icon={icon_files}
        class="md:col-span-2"
    />
    {/* ... other items */}
</BentoGrid>`;
</script>

{#snippet header1()}
    <div class="bg-primary/20 flex h-full min-h-[6rem] w-full flex-1 p-4">
        <div
            class="border-foreground/20 rounded-brutalist flex h-full w-full items-center justify-center border-2 border-dashed"
        >
            CONTENT
        </div>
    </div>
{/snippet}

{#snippet icon_files()}
    <Icon icon={Files01Icon} class="text-primary h-4 w-4" />
{/snippet}

{#snippet icon_note()}
    <Icon icon={Note01Icon} class="text-secondary h-4 w-4" />
{/snippet}

{#snippet icon_sign()}
    <Icon icon={SignatureIcon} class="text-destructive h-4 w-4" />
{/snippet}

{#snippet icon_table()}
    <Icon icon={TableIcon} class="text-success h-4 w-4" />
{/snippet}

{#snippet icon_image()}
    <Icon icon={Image01Icon} class="h-4 w-4" />
{/snippet}

{#snippet icon_settings()}
    <Icon icon={Settings01Icon} class="h-4 w-4" />
{/snippet}

{#snippet icon_comm()}
    <Icon icon={BubbleChatIcon} class="h-4 w-4" />
{/snippet}

<DocPage
    title="Bento Grid"
    description="A variable-sized grid system for creating stunning layouts."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Standard Bento</h2>
            <CodePreview code={basicUsage}>
                <BentoGrid class="mx-auto max-w-4xl md:auto-rows-[20rem]">
                    <BentoGridItem
                        title="The Dawn of Innovation"
                        description="Explore the birth of new ideas and inventions."
                        header={header1}
                        icon={icon_files}
                        class="md:col-span-2"
                    />
                    <BentoGridItem
                        title="The Digital Revolution"
                        description="Dive into the transformative power of technology."
                        header={header1}
                        icon={icon_note}
                        class="md:col-span-1"
                    />
                    <BentoGridItem
                        title="The Art of Design"
                        description="Discover the principles of aesthetic excellence."
                        header={header1}
                        icon={icon_sign}
                        class="md:col-span-1"
                    />
                    <BentoGridItem
                        title="The Power of Communication"
                        description="Understand the impact of effective communication."
                        header={header1}
                        icon={icon_table}
                        class="md:col-span-2"
                    />
                </BentoGrid>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Mixed Variants</h2>
            <div class="space-y-4">
                <BentoGrid class="mx-auto max-w-4xl">
                    <BentoGridItem
                        title="Media Library"
                        description="Manage all your assets in one place."
                        class="bg-secondary md:col-span-1"
                        icon={icon_image}
                    />
                    <BentoGridItem
                        title="System Settings"
                        description="Configuration options for your workspace."
                        class="bg-primary text-primary-foreground shadow-none md:col-span-2"
                        icon={icon_settings}
                    />
                    <BentoGridItem
                        title="Team Collaboration"
                        description="Work together seamlessly with your peers."
                        class="bg-success h-32 md:col-span-3"
                        icon={icon_comm}
                    />
                </BentoGrid>
            </div>
        </section>
    </div>
</DocPage>
