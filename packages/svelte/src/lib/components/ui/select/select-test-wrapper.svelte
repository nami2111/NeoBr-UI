<script lang="ts">
    import Select from "./select.svelte";
    import SelectTrigger from "./select-trigger.svelte";
    import SelectContent from "./select-content.svelte";
    import SelectItem from "./select-item.svelte";

    type Props = {
        value?: string;
        type?: "single";
        disabled?: boolean;
        items?: Array<{ value: string; label: string }>;
    };

    let { value = $bindable(), type = "single", disabled = false, items = [] }: Props = $props();
</script>

<Select bind:value {type} {disabled} {items}>
    <SelectTrigger placeholder="Select an option" />
    <SelectContent>
        {#each items as item (item.value)}
            <SelectItem value={item.value} label={item.label}>{item.label}</SelectItem>
        {/each}
    </SelectContent>
</Select>
