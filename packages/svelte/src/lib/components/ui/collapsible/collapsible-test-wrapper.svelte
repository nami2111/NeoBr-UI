<script lang="ts">
    import Collapsible from "./collapsible.svelte";
    import CollapsibleTrigger from "./collapsible-trigger.svelte";
    import CollapsibleContent from "./collapsible-content.svelte";

    let { disabled = false }: { disabled?: boolean } = $props();
</script>

<Collapsible {disabled}>
    <CollapsibleTrigger>Toggle</CollapsibleTrigger>
    <CollapsibleContent>Collapsible content</CollapsibleContent>
</Collapsible>
