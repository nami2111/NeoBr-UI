<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { Menu01Icon } from "@hugeicons/core-free-icons";

    let { children } = $props();
    let isMobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<Toaster />

<div class="bg-background text-foreground flex min-h-screen flex-col">
    <!-- Header -->
    <header
        class="border-foreground bg-background sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 px-6"
    >
        <div class="flex items-center gap-4">
            <Button variant="outline" size="sm" class="lg:hidden" onclick={toggleMobileMenu}>
                <Icon icon={Menu01Icon} class="h-5 w-5" />
            </Button>
            <a
                href="/"
                class="hover:text-primary text-stroke-2 text-2xl font-black tracking-tighter transition-colors"
            >
                NEOBR-UI
            </a>
        </div>
        <div class="flex items-center gap-4">
            <ThemeToggle />
        </div>
    </header>

    <div class="relative flex flex-1">
        <!-- Desktop Sidebar -->
        <Sidebar class="sticky top-16 hidden h-[calc(100vh-64px)] shrink-0 lg:block" />

        <!-- Mobile Sidebar Overlay -->
        {#if isMobileMenuOpen}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="fixed inset-0 z-40 bg-black/50 lg:hidden" onclick={toggleMobileMenu}></div>
            <div class="bg-background fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
                <Sidebar class="h-full" />
            </div>
        {/if}

        <!-- Main Content -->
        <main class="mx-auto w-full max-w-5xl flex-1 p-6 md:p-10">
            {@render children?.()}
        </main>
    </div>
</div>
