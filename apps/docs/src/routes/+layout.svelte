<script>
    import "../app.css";
    import ThemeToggle from "../lib/components/ThemeToggle.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import { Toaster, Button, Icon } from "@neobr/svelte";
    import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

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
</script>

<svelte:window bind:scrollY bind:innerHeight />
<div bind:clientHeight={bodyHeight}></div>

<Toaster />

<div class="bg-background text-foreground flex min-h-screen flex-col">
    <!-- Scroll Progress -->
    <div class="bg-primary/20 sticky top-0 z-[60] h-1 w-full overflow-hidden">
        <div
            class="bg-primary h-full transition-all duration-150 ease-out"
            style="width: {scrollProgress}%"
        ></div>
    </div>

    <!-- Header -->
    <header
        class="border-foreground bg-background/80 sticky top-1 z-50 flex h-16 items-center justify-between border-b-2 px-6 backdrop-blur-md"
    >
        <div class="flex items-center gap-4">
            <Button variant="outline" size="sm" class="lg:hidden" onclick={toggleMobileMenu}>
                <Icon icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon} class="h-5 w-5" />
            </Button>
            <a
                href="/"
                class="hover:text-primary text-stroke-2 text-2xl font-black tracking-tighter transition-colors"
                aria-label="NeoBr UI Home"
            >
                NEOBR-UI
            </a>
        </div>
        <div class="flex items-center gap-4">
            <a
                href="https://github.com/nami2111/NeoBr-UI"
                target="_blank"
                rel="noreferrer"
                class="hover:bg-accent border-foreground rounded-brutalist flex h-10 w-10 items-center justify-center border-2 transition-all active:translate-y-[2px]"
                aria-label="GitHub Repository"
            >
                <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                    <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    />
                </svg>
            </a>
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
