<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@neobr/svelte";

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
    </div>
</DocPage>
