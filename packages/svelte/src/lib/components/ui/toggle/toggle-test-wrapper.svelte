<script lang="ts">
    import Toggle from "./toggle.svelte";

    let { variant = "default", disabled = false, class: className = undefined }: {
        variant?: "default" | "outline";
        disabled?: boolean;
        class?: string;
    } = $props();
</script>

<Toggle {variant} {disabled} class={className}>Toggle me</Toggle>
