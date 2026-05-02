<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Icon } from "@neobr/svelte";
    import { Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";

    let isDark = $state(false);

    function toggleTheme() {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    onMount(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            isDark = true;
            document.documentElement.classList.add("dark");
        }
    });
</script>

<Button variant="outline" size="icon" onclick={toggleTheme}>
    <Icon icon={isDark ? Sun02Icon : Moon02Icon} class="h-5 w-5" />
</Button>
