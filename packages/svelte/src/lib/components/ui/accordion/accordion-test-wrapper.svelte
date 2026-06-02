<script lang="ts">
    import * as Accordion from "./index";

    let {
        type = "single",
        value = $bindable(),
    }: {
        type?: "single" | "multiple";
        value?: string | string[];
    } = $props();
</script>

<Accordion.Accordion {type} bind:value>
    <Accordion.AccordionItem value="item-1">
        <Accordion.AccordionTrigger>Is it accessible?</Accordion.AccordionTrigger>
        <Accordion.AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.AccordionContent>
    </Accordion.AccordionItem>
    <Accordion.AccordionItem value="item-2">
        <Accordion.AccordionTrigger>Is it styled?</Accordion.AccordionTrigger>
        <Accordion.AccordionContent>
            Yes. It comes with premium Neo-Brutalist styling.
        </Accordion.AccordionContent>
    </Accordion.AccordionItem>
</Accordion.Accordion>
