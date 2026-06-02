<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { page } from "$app/state";
    import { Menu01Icon, Cancel01Icon, Github01Icon } from "@hugeicons/core-free-icons";

    let { children } = $props();
    let isMobileMenuOpen = $state(false);
    let scrollY = $state(0);
    let innerHeight = $state(0);
    let bodyHeight = $state(0);

    const scrollProgress = $derived(
        bodyHeight > innerHeight ? (scrollY / (bodyHeight - innerHeight)) * 100 : 0,
    );

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }

    const showSidebar = $derived(
        page.url.pathname.startsWith("/docs") ||
            (page.url.pathname.startsWith("/components") && page.url.pathname !== "/components"),
    );
</script>

<svelte:window bind:scrollY bind:innerHeight />
<div bind:clientHeight={bodyHeight}></div>

<Toaster />

<div class="bg-background text-foreground flex min-h-screen flex-col overflow-x-hidden">
    <!-- Scroll Progress -->
    <div
        class="bg-primary/20 sticky top-0 h-1 w-full overflow-hidden"
        style="z-index: var(--z-popover)"
    >
        <div
            class="bg-primary h-full transition-all duration-150 ease-out"
            style="width: {scrollProgress}%"
        ></div>
    </div>

    <!-- Header -->
    <header
        class="border-foreground bg-background/80 sticky top-0 flex h-16 items-center justify-between border-b-2 px-6 backdrop-blur-md"
        style="z-index: var(--z-modal)"
    >
        <div class="flex items-center gap-4">
            {#if showSidebar}
                <Button variant="outline" size="sm" class="lg:hidden" onclick={toggleMobileMenu}>
                    <Icon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} class="h-5 w-5" />
                </Button>
            {/if}
            <a
                href="/"
                class="hover:text-primary text-stroke-2 text-2xl font-black tracking-tighter transition-colors"
                aria-label="NeoBr UI Home"
            >
                NEOBR-UI
            </a>
            {#if !showSidebar}
                <nav class="hidden items-center gap-6 md:flex">
                    <a
                        href="/components"
                        class="text-sm font-bold transition-colors hover:text-primary"
                    >
                        Components
                    </a>
                    <a
                        href="/docs/introduction"
                        class="text-sm font-bold transition-colors hover:text-primary"
                    >
                        Docs
                    </a>
                </nav>
            {/if}
        </div>
        <div class="flex items-center gap-4">
            <Button
                variant="outline"
                size="icon"
                href="https://github.com/nami2111/NeoBr-UI"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
            >
                <Icon icon={Github01Icon} class="h-5 w-5" />
            </Button>
            <ThemeToggle />
        </div>
    </header>

    {#if showSidebar}
        <!-- Sidebar Layout -->
        <div class="relative flex flex-1">
            <!-- Desktop Sidebar - fixed position -->
            <Sidebar
                class="fixed top-16 left-0 hidden h-[calc(100vh-64px)] w-64 shrink-0 overflow-hidden lg:block"
            />

            <!-- Mobile Sidebar Overlay -->
            {#if isMobileMenuOpen}
                <button
                    type="button"
                    class="fixed inset-0 bg-black/50"
                    style="z-index: var(--z-sheet-backdrop)"
                    aria-label="Close mobile navigation"
                    onclick={toggleMobileMenu}
                ></button>
                <div
                    class="bg-background fixed inset-y-0 left-0 w-64"
                    style="z-index: var(--z-sheet)"
                >
                    <Sidebar class="h-full" />
                </div>
            {/if}

            <!-- Main Content - with left padding for sidebar -->
            <main class="flex-1 p-6 md:p-10 lg:pl-64">
                <div class="mx-auto max-w-4xl">
                    {@render children?.()}
                </div>
            </main>
        </div>
    {:else}
        <!-- No Sidebar Layout -->
        <main class="mx-auto w-full max-w-5xl flex-1 p-6">
            {@render children?.()}
        </main>
    {/if}
</div>