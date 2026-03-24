<script lang="ts">
    import RadioGroup from "./radio-group.svelte";
    import RadioGroupItem from "./radio-group-item.svelte";

    let {
        value = undefined,
        disabled = false,
        class: className = undefined,
    }: {
        value?: string;
        disabled?: boolean;
        class?: string;
    } = $props();
</script>

<RadioGroup bind:value {disabled} class={className} name="test">
    <RadioGroupItem value="option1" id="opt1" />
    <RadioGroupItem value="option2" id="opt2" />
    <RadioGroupItem value="option3" id="opt3" />
</RadioGroup>
