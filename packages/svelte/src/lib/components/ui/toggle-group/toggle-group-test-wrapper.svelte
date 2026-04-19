<script lang="ts">
    import ToggleGroup from "./toggle-group.svelte";
    import ToggleGroupItem from "./toggle-group-item.svelte";

    let {
        type = "single",
        value = undefined,
        class: className = undefined,
    }: {
        type?: "single" | "multiple";
        value?: string | string[];
        class?: string;
    } = $props();
</script>

<ToggleGroup {type} bind:value class={className}>
    <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
    <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
    <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
