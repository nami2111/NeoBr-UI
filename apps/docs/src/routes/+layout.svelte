<script lang="ts">
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { page } from "$app/state";
    import { afterNavigate } from "$app/navigation";
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

    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }

    const showSidebar = $derived(
        page.url.pathname.startsWith("/docs") ||
            (page.url.pathname.startsWith("/components") && page.url.pathname !== "/components"),
    );

    function isActive(href: string) {
        if (href === "/") {
            return page.url.pathname === "/";
        }

        return page.url.pathname.startsWith(href);
    }

    afterNavigate(() => {
        closeMobileMenu();
    });
</script>

<svelte:window bind:scrollY bind:innerHeight />

<Toaster />

<div
    bind:clientHeight={bodyHeight}
    class="bg-background text-foreground flex min-h-screen flex-col overflow-x-hidden"
>
    <a href="#content" class="skip-link">Skip To Content</a>

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
        class="border-foreground bg-background/95 sticky top-0 flex h-16 items-center justify-between border-b-2 px-4 backdrop-blur-md md:px-6"
        style="z-index: var(--z-modal)"
    >
        <div class="flex min-w-0 items-center gap-3 md:gap-4">
            {#if showSidebar}
                <Button
                    variant="outline"
                    size="sm"
                    class="lg:hidden"
                    onclick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? "Close mobile navigation" : "Open mobile navigation"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    <Icon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} class="h-5 w-5" />
                </Button>
            {/if}
            <a
                href="/"
                class="hover:text-primary text-stroke-2 text-xl font-black transition-colors md:text-2xl"
                aria-label="NeoBr UI Home"
            >
                NEOBR-UI
            </a>
            <nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                <a
                    href="/components"
                    aria-current={isActive("/components") ? "page" : undefined}
                    class="border-foreground px-3 py-2 text-sm font-bold transition-colors hover:bg-accent aria-[current=page]:border-2 aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
                >
                    Components
                </a>
                <a
                    href="/docs/introduction"
                    aria-current={isActive("/docs") ? "page" : undefined}
                    class="border-foreground px-3 py-2 text-sm font-bold transition-colors hover:bg-accent aria-[current=page]:border-2 aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
                >
                    Docs
                </a>
            </nav>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
            {#if !showSidebar}
                <Button variant="outline" size="sm" class="md:hidden" href="/components">
                    Browse
                </Button>
            {/if}
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
                    onclick={closeMobileMenu}
                ></button>
                <div
                    id="mobile-navigation"
                    class="bg-background fixed inset-y-0 left-0 w-72 max-w-[85vw]"
                    style="z-index: var(--z-sheet)"
                >
                    <Sidebar class="h-full" />
                </div>
            {/if}

            <!-- Main Content - with left padding for sidebar -->
            <main id="content" class="flex-1 p-5 md:p-10 lg:pl-64">
                <div class="mx-auto max-w-4xl">
                    {@render children?.()}
                </div>
            </main>
        </div>
    {:else}
        <!-- No Sidebar Layout -->
        <main id="content" class="mx-auto w-full max-w-6xl flex-1 p-5 md:p-6">
            {@render children?.()}
        </main>
    {/if}
</div>
