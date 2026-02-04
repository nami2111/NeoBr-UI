<script lang="ts">
    import Select from "./select.svelte";
    import SelectTrigger from "./select-trigger.svelte";
    import SelectContent from "./select-content.svelte";
    import SelectItem from "./select-item.svelte";

    let value = $state("");
</script>

<Select bind:value>
    <SelectTrigger>
        {value
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "Pick an environment"}
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="production">Production</SelectItem>
        <SelectItem value="staging">Staging</SelectItem>
    </SelectContent>
</Select>
