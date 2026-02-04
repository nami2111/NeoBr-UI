<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";

    let { children } = $props();
</script>

<ThemeToggle />

{@render children?.()}
