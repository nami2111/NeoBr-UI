<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Accordion,
        AccordionItem,
        AccordionTrigger,
        AccordionContent,
        Icon,
    } from "@neobr/svelte";
    import {
        InformationCircleIcon,
        Settings01Icon,
        HelpCircleIcon,
    } from "@hugeicons/core-free-icons";

    const singleExample = `<Accordion type="single" value="item-1">
    <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
            Yes. It has a default neo-brutalist aesthetic.
        </AccordionContent>
    </AccordionItem>
</Accordion>`;

    const multipleExample = `<Accordion type="multiple" value={["item-1", "item-2"]}>
    <AccordionItem value="item-1">
        <AccordionTrigger>What is Neo-Brutalism?</AccordionTrigger>
        <AccordionContent>
            A design style that emphasizes raw, unpolished, and bold aesthetics...
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Why choose NeoBr-UI?</AccordionTrigger>
        <AccordionContent>
            It combines the speed of Svelte 5 with a unique, high-impact design language.
        </AccordionContent>
    </AccordionItem>
</Accordion>`;

    const customExample = `<Accordion type="single" class="border-primary shadow-brutalist">
    <AccordionItem value="item-1" class="border-primary">
        <AccordionTrigger class="hover:bg-primary/10 text-primary">
            Color Theme Customization
        </AccordionTrigger>
        <AccordionContent class="text-primary italic">
            Easily change colors using Tailwind utility classes.
        </AccordionContent>
    </AccordionItem>
</Accordion>`;

    const withIconsExample = `<Accordion type="single">
    <AccordionItem value="item-1">
        <AccordionTrigger>
            <div class="flex items-center gap-2">
                <Icon icon={InformationCircleIcon} class="h-5 w-5" />
                <span>General Information</span>
            </div>
        </AccordionTrigger>
        <AccordionContent>...</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>
            <div class="flex items-center gap-2">
                <Icon icon={Settings01Icon} class="h-5 w-5" />
                <span>Settings</span>
            </div>
        </AccordionTrigger>
        <AccordionContent>...</AccordionContent>
    </AccordionItem>
</Accordion>`;
</script>

<DocPage
    title="Accordion"
    description="A vertically stacked set of interactive headings that each reveal a section of content."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Single Open Item</h2>
            <CodePreview code={singleExample}>
                <Accordion type="single" value="item-1" class="w-full max-w-md">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It has a default neo-brutalist aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">
                Multiple Open Items
            </h2>
            <CodePreview code={multipleExample}>
                <Accordion type="multiple" value={["item-1", "item-2"]} class="w-full max-w-md">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Neo-Brutalism?</AccordionTrigger>
                        <AccordionContent>
                            A design style that emphasizes raw, unpolished, and bold aesthetics,
                            often featuring high contrast and distinct geometric shapes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why choose NeoBr-UI?</AccordionTrigger>
                        <AccordionContent>
                            It combines the speed of Svelte 5 with a unique, high-impact design
                            language that users won't forget.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Custom Styled</h2>
            <CodePreview code={customExample}>
                <Accordion type="single" class="border-primary shadow-brutalist w-full max-w-md">
                    <AccordionItem value="item-1" class="border-primary">
                        <AccordionTrigger
                            class="hover:bg-primary/10 text-primary data-[state=open]:bg-primary/5"
                        >
                            Color Theme Customization
                        </AccordionTrigger>
                        <AccordionContent class="text-primary italic">
                            You can easily change the border colors and backgrounds using Tailwind
                            utility classes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" class="border-primary">
                        <AccordionTrigger
                            class="hover:bg-primary/10 text-primary data-[state=open]:bg-primary/5"
                        >
                            Active State Colors
                        </AccordionTrigger>
                        <AccordionContent class="text-primary italic">
                            The primary color can be used to highlight active sections or matching
                            themes.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">With Icons</h2>
            <CodePreview code={withIconsExample}>
                <Accordion type="single" class="w-full max-w-md">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div class="flex items-center gap-2">
                                <Icon icon={InformationCircleIcon} class="text-primary h-5 w-5" />
                                <span>General Information</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            Access all your general information and profile settings here.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <div class="flex items-center gap-2">
                                <Icon icon={Settings01Icon} class="text-secondary h-5 w-5" />
                                <span>Preferences</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            Adjust your application preferences and theme settings.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <div class="flex items-center gap-2">
                                <Icon icon={HelpCircleIcon} class="text-success h-5 w-5" />
                                <span>Support</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>Get help and contact our support team.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CodePreview>
        </section>
    </div>
</DocPage>
