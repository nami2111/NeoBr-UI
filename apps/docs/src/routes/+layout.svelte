<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import { Toaster } from "@neobr/svelte";

    let { children } = $props();
</script>

<Toaster />
<ThemeToggle />

{@render children?.()}
