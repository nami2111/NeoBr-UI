<script lang="ts">
    import Form from "./form.svelte";
    import FormItem from "./form-item.svelte";
    import FormLabel from "./form-label.svelte";
    import FormDescription from "./form-description.svelte";
    import FormMessage from "./form-message.svelte";
    import Input from "../input/input.svelte";

    let {
        value = $bindable(""),
        error = false,
        label = "",
        description = "",
        placeholder = "",
    } = $props();
</script>

<Form>
    <FormItem {error}>
        {#if label}
            <FormLabel>{label}</FormLabel>
        {/if}
        <Input bind:value {placeholder} />
        {#if description}
            <FormDescription>{description}</FormDescription>
        {/if}
        <FormMessage />
    </FormItem>
</Form>
