<script lang="ts">
    import {
        Button,
        Input,
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
        Badge,
        Link,
        Icon,
        Loading,
        Alert,
        AlertTitle,
        AlertDescription,
        Accordion,
        AccordionItem,
        AccordionTrigger,
        AccordionContent,
        Tabs,
        TabsList,
        TabsTrigger,
        TabsContent,
        Modal,
        DropdownMenu,
        DropdownMenuItem,
        Form,
        FormItem,
        FormLabel,
        FormDescription,
        FormMessage,
        Switch,
        Slider,
        Checkbox,
        RadioGroup,
        RadioGroupItem,
        Label,
        Separator,
        Avatar,
        Tooltip,
        Select,
        SelectTrigger,
        SelectContent,
        SelectItem,
        toast,
        Toaster,
        Skeleton,
        Progress,
        Breadcrumbs,
        BreadcrumbList,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbPage,
        BreadcrumbSeparator,
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
        PaginationPrevious,
        PaginationNext,
        PaginationEllipsis,
        Sheet,
    } from "@neobr/svelte";
    import { Home01Icon, Notification02Icon } from "@hugeicons/core-free-icons";

    let showModal = $state(false);

    // Form validation state
    let email = $state("");
    let sliderValue = $state(50);
    let checkboxState = $state(true);
    let radioValue = $state("option-2");
    let selectValue = $state("");
    let emailError = $derived(
        email.length > 0 && !email.includes("@")
            ? "Please enter a valid email address."
            : "",
    );

    let notifications = $state(true);
    let volume = $state(45);
    let showSheet = $state(false);
    let loading = $state(true);
    let progress = $state(33);
    let currentPage = $state(2);

    $effect(() => {
        const timer = setTimeout(() => (loading = false), 2000);
        return () => clearTimeout(timer);
    });

    $effect(() => {
        const interval = setInterval(() => {
            progress = progress >= 100 ? 0 : progress + 1;
        }, 100);
        return () => clearInterval(interval);
    });
</script>

<div class="container mx-auto py-10 space-y-10">
    <div class="space-y-4">
        <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
            NeoBr-UI Showcase
        </h1>
        <p class="text-muted-foreground">
            A clean Neo Brutalism component library.
        </p>
    </div>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Buttons
        </h2>
        <div class="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Interactivity & Overlays
        </h2>
        <div class="flex flex-wrap gap-6 items-start">
            <div class="space-y-2">
                <p
                    class="text-sm font-bold text-muted-foreground uppercase tracking-widest"
                >
                    Modal Overlay
                </p>
                <Button onclick={() => (showModal = true)}>Open Modal</Button>
                <Modal bind:open={showModal} title="Neo Brutalist Modal">
                    <p class="py-4">
                        This is a high-contrast modal with refined 12px rounded
                        edges and centered shadows. It supports both light and
                        dark themes.
                    </p>
                    <div class="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onclick={() => (showModal = false)}>Cancel</Button
                        >
                        <Button onclick={() => (showModal = false)}
                            >Confirm</Button
                        >
                    </div>
                </Modal>
            </div>

            <div class="space-y-2">
                <p
                    class="text-sm font-bold text-muted-foreground uppercase tracking-widest"
                >
                    Dropdown Menu
                </p>
                {#snippet menuTrigger()}
                    <Button variant="outline">Options Menu</Button>
                {/snippet}
                <DropdownMenu trigger={menuTrigger}>
                    <DropdownMenuItem onclick={() => console.log("Profile")}
                        >Profile Settings</DropdownMenuItem
                    >
                    <DropdownMenuItem onclick={() => console.log("Billing")}
                        >Billing & Plans</DropdownMenuItem
                    >
                    <DropdownMenuItem
                        class="text-destructive"
                        onclick={() => console.log("Logout")}
                        >Logout</DropdownMenuItem
                    >
                </DropdownMenu>
            </div>

            <div class="space-y-2">
                <p
                    class="text-sm font-bold text-muted-foreground uppercase tracking-widest"
                >
                    Sheet (Drawer)
                </p>
                <div class="flex gap-2">
                    <Button variant="outline" onclick={() => (showSheet = true)}
                        >Right Sheet</Button
                    >
                </div>
                <Sheet
                    bind:open={showSheet}
                    title="System Configuration"
                    side="right"
                >
                    <div class="space-y-6 py-4">
                        <div class="space-y-2">
                            <h4 class="font-bold">Performance Mode</h4>
                            <p class="text-sm text-muted-foreground">
                                High performance enables multi-core processing.
                            </p>
                            <Switch checked />
                        </div>
                        <Separator />
                        <div class="space-y-2">
                            <h4 class="font-bold">Theme Settings</h4>
                            <div class="flex gap-2">
                                <Button size="sm" variant="outline"
                                    >Light</Button
                                >
                                <Button size="sm" variant="primary">Dark</Button
                                >
                            </div>
                        </div>
                        <div class="pt-4">
                            <Button
                                class="w-full"
                                onclick={() => (showSheet = false)}
                                >Save Changes</Button
                            >
                        </div>
                    </div>
                </Sheet>
            </div>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Inputs & Forms
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Interactive Validation</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form
                        onsubmit={(e) => e.preventDefault()}
                        class="space-y-4"
                    >
                        <FormItem error={emailError}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                bind:value={email}
                                placeholder="neo@brutalist.com"
                            />
                            <FormDescription
                                >We'll never share your email with anyone else.</FormDescription
                            >
                            <FormMessage />
                        </FormItem>
                        <Button type="submit" class="w-full">Subscribe</Button>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Standard Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form
                        onsubmit={(e) => e.preventDefault()}
                        class="space-y-4"
                    >
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="neo_brutalist" />
                        </FormItem>
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <Input placeholder="Brutalism is efficiency..." />
                        </FormItem>
                        <Button type="submit" class="w-full"
                            >Save Profile</Button
                        >
                    </Form>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Cards & Links
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                    <CardDescription
                        >With external and internal links</CardDescription
                    >
                </CardHeader>
                <CardContent class="space-y-4">
                    <p>Cards are the foundation of Brutalist layouts.</p>
                    <div class="flex gap-4">
                        <Link href="https://svelte.dev" target="_blank"
                            >Svelte Docs</Link
                        >
                        <Link href="#" variant="secondary">Local Link</Link>
                    </div>
                </CardContent>
                <CardFooter>
                    <p class="text-sm">Footer text here</p>
                </CardFooter>
            </Card>

            <Card class="bg-accent text-accent-foreground">
                <CardHeader>
                    <CardTitle>Accent Card</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>High impact cards for important call-outs.</p>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Loading & Feedback
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Skeleton Loaders</CardTitle>
                    <CardDescription
                        >Animated placeholders for content states.</CardDescription
                    >
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center space-x-4">
                        <Skeleton class="h-12 w-12 rounded-full" />
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-[250px]" />
                            <Skeleton class="h-4 w-[200px]" />
                        </div>
                    </div>
                    {#if loading}
                        <div class="space-y-3">
                            <Skeleton class="h-8 w-full" />
                            <Skeleton class="h-32 w-full" />
                        </div>
                    {:else}
                        <div
                            class="p-4 border-2 border-foreground rounded-brutalist bg-accent"
                        >
                            <p class="font-bold uppercase tracking-tight">
                                Content Loaded!
                            </p>
                            <p class="text-sm">
                                The skeleton vanished after the data arrived.
                            </p>
                        </div>
                    {/if}
                    <Button
                        size="sm"
                        variant="outline"
                        onclick={() => (loading = true)}>Reset Loader</Button
                    >
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Progress Bars</CardTitle>
                    <CardDescription
                        >Visual status for long-running tasks.</CardDescription
                    >
                </CardHeader>
                <CardContent class="space-y-8">
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs font-bold">
                            <span>SYSTEM UPLOAD</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                    <div class="space-y-2">
                        <p class="text-xs font-bold uppercase tracking-widest">
                            Syncing Data...
                        </p>
                        <Progress indeterminate />
                    </div>
                    <div class="space-y-2">
                        <p class="text-xs font-bold uppercase tracking-widest">
                            Destructive Action (Active)
                        </p>
                        <Progress
                            indeterminate
                            class="[&>div]:bg-destructive"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Loading Spinners</CardTitle>
                    <CardDescription>Animated state indicators.</CardDescription
                    >
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="flex items-center space-x-6">
                        <Loading size="sm" />
                        <Loading size="default" />
                        <Loading size="lg" />
                        <Loading size="xl" />
                    </div>
                    <div class="flex items-center space-x-6">
                        <Loading variant="default" size="lg" />
                        <Loading variant="secondary" size="lg" />
                        <Loading variant="muted" size="lg" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Status labels and tags.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="flex flex-wrap gap-2">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <div class="space-y-2">
                            <p
                                class="text-[10px] font-bold uppercase opacity-50"
                            >
                                Brutalist
                            </p>
                            <div class="flex gap-2">
                                <Badge brutalist={true}>New</Badge>
                                <Badge brutalist={true} variant="secondary"
                                    >Beta</Badge
                                >
                            </div>
                        </div>
                        <div class="space-y-2">
                            <p
                                class="text-[10px] font-bold uppercase opacity-50"
                            >
                                Standard
                            </p>
                            <div class="flex gap-2">
                                <Badge brutalist={false}>Standard</Badge>
                                <Badge brutalist={false} variant="secondary"
                                    >Pill</Badge
                                >
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Navigation & Structure
        </h2>
        <div class="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Breadcrumbs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Breadcrumbs>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/docs"
                                    >Documentation</BreadcrumbLink
                                >
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/docs/components"
                                    >Components</BreadcrumbLink
                                >
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumbs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pagination</CardTitle>
                </CardHeader>
                <CardContent>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onclick={(e: MouseEvent) => {
                                        e.preventDefault();
                                        currentPage = Math.max(
                                            1,
                                            currentPage - 1,
                                        );
                                    }}
                                />
                            </PaginationItem>
                            {#each [1, 2, 3] as page}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onclick={(e: MouseEvent) => {
                                            e.preventDefault();
                                            currentPage = page;
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            {/each}
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">99</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onclick={(e: MouseEvent) => {
                                        e.preventDefault();
                                        currentPage = Math.min(
                                            99,
                                            currentPage + 1,
                                        );
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <p class="mt-4 text-sm font-bold text-center">
                        Viewing Page: <span class="text-primary"
                            >{currentPage}</span
                        >
                    </p>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Alerts
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
                <Icon icon={Home01Icon} class="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    This is a default alert for general information.
                </AlertDescription>
            </Alert>

            <Alert variant="destructive">
                <Icon icon={Notification02Icon} class="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    This is a destructive alert for critical errors.
                </AlertDescription>
            </Alert>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Accordion
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Single Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" value="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Section 1</AccordionTrigger>
                            <AccordionContent>
                                Content for section 1.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Section 2</AccordionTrigger>
                            <AccordionContent>
                                Content for section 2.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Multiple Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" value={["item-1"]}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Item 1</AccordionTrigger>
                            <AccordionContent>
                                Multiple items can be open.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Item 2</AccordionTrigger>
                            <AccordionContent>
                                This one is also toggleable.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Tabs
        </h2>
        <Card>
            <CardHeader>
                <CardTitle>Interactive Tabs</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value="tab-1">
                    <TabsList>
                        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab-3" disabled
                            >Disabled</TabsTrigger
                        >
                    </TabsList>
                    <TabsContent value="tab-1">
                        <div
                            class="p-4 border-2 border-foreground mt-2 rounded-brutalist"
                        >
                            Content for Tab 1
                        </div>
                    </TabsContent>
                    <TabsContent value="tab-2">
                        <div
                            class="p-4 border-2 border-foreground mt-2 rounded-brutalist"
                        >
                            Content for Tab 2
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Interactive Controls
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Switch Toggles</CardTitle>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <p class="font-bold">Email Notifications</p>
                            <p class="text-xs text-muted-foreground">
                                Receive daily digests.
                            </p>
                        </div>
                        <Switch bind:checked={notifications} />
                    </div>
                    <div class="flex items-center justify-between opacity-50">
                        <div class="space-y-0.5">
                            <p class="font-bold">Marketing Emails</p>
                            <p class="text-xs text-muted-foreground">
                                Disabled by admin.
                            </p>
                        </div>
                        <Switch disabled />
                    </div>
                    <div class="flex gap-4">
                        <Switch variant="destructive" checked />
                        <Switch variant="success" checked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Slider Ranges</CardTitle>
                </CardHeader>
                <CardContent class="space-y-8 pt-4">
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <p class="font-bold">Volume Level</p>
                            <Badge>{volume}%</Badge>
                        </div>
                        <Slider bind:value={volume} min={0} max={100} />
                    </div>
                    <div class="space-y-4 opacity-50">
                        <p class="text-xs font-bold uppercase tracking-wider">
                            Brightness (Disabled)
                        </p>
                        <Slider value={70} disabled />
                    </div>
                </CardContent>
            </Card>
        </div>
        <section class="space-y-4">
            <h2
                class="font-mono text-2xl font-bold uppercase tracking-brutalist"
            >
                Selection Controls
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Checkbox</CardTitle>
                        <CardDescription
                            >Tactile selection with bold visual feedback.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <Checkbox id="terms" bind:checked={checkboxState} />
                            <Label for="terms" class="cursor-pointer"
                                >Accept terms and conditions</Label
                            >
                        </div>
                        <div class="flex items-center space-x-3">
                            <Checkbox id="marketing" disabled />
                            <Label for="marketing" class="opacity-50"
                                >Receive marketing emails (Disabled)</Label
                            >
                        </div>
                        <p class="text-sm font-medium">
                            State: <span class="text-primary font-bold"
                                >{checkboxState ? "Checked" : "Unchecked"}</span
                            >
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Radio Group</CardTitle>
                        <CardDescription
                            >Coordinate selection across multiple options.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <RadioGroup bind:value={radioValue}>
                            <div class="flex items-center space-x-3">
                                <RadioGroupItem value="option-1" id="r1" />
                                <Label for="r1" class="cursor-pointer"
                                    >Standard Delivery</Label
                                >
                            </div>
                            <div class="flex items-center space-x-3">
                                <RadioGroupItem value="option-2" id="r2" />
                                <Label for="r2" class="cursor-pointer"
                                    >Express Delivery</Label
                                >
                            </div>
                            <div class="flex items-center space-x-3">
                                <RadioGroupItem
                                    value="option-3"
                                    id="r3"
                                    disabled
                                />
                                <Label for="r3" class="opacity-50"
                                    >Drone Delivery (Out of Stock)</Label
                                >
                            </div>
                        </RadioGroup>
                        <p class="text-sm font-medium">
                            Selected: <span class="text-primary font-bold"
                                >{radioValue}</span
                            >
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
        <section class="space-y-4">
            <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
                Global Notifications (Toasts)
            </h2>
            <Card>
                <CardHeader>
                    <CardTitle>Trigger Notifications</CardTitle>
                    <CardDescription
                        >Bold alerts that pop from the corner of the screen.</CardDescription
                    >
                </CardHeader>
                <CardContent>
                    <div class="flex flex-wrap gap-4">
                        <Button
                            onclick={() =>
                                toast.add({
                                    title: "Update",
                                    description:
                                        "A new version of NeoBr-UI is available.",
                                })}
                        >
                            Default Toast
                        </Button>
                        <Button
                            variant="success"
                            onclick={() =>
                                toast.success(
                                    "Your profile has been saved successfully!",
                                    { title: "Success" },
                                )}
                        >
                            Success Toast
                        </Button>
                        <Button
                            variant="destructive"
                            onclick={() =>
                                toast.error(
                                    "Unable to connect to the server. Please try again.",
                                    { title: "Connection Error" },
                                )}
                        >
                            Error Toast
                        </Button>
                        <Button
                            variant="warning"
                            onclick={() =>
                                toast.warning(
                                    "Your storage is almost full. Check your plan.",
                                    { title: "Warning" },
                                )}
                        >
                            Warning Toast
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>

        <!-- Advanced Selection -->
        <section class="space-y-4">
            <h2
                class="font-mono text-2xl font-bold uppercase tracking-brutalist border-b-2 border-foreground pb-2"
            >
                Advanced Selection
            </h2>
            <Card>
                <CardHeader>
                    <CardTitle>Select</CardTitle>
                    <CardDescription
                        >A bold, custom dropdown replacement.</CardDescription
                    >
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="max-w-xs">
                        <Select bind:value={selectValue}>
                            <SelectTrigger>
                                {selectValue
                                    ? selectValue.charAt(0).toUpperCase() +
                                      selectValue.slice(1)
                                    : "Pick an environment"}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="production"
                                    >Production</SelectItem
                                >
                                <SelectItem value="staging">Staging</SelectItem>
                                <SelectItem value="development"
                                    >Development</SelectItem
                                >
                                <SelectItem value="local" disabled
                                    >Local (Internal only)</SelectItem
                                >
                            </SelectContent>
                        </Select>
                    </div>
                    <p class="text-sm font-medium">
                        Selected: <span class="font-mono font-bold text-primary"
                            >{selectValue || "none"}</span
                        >
                    </p>
                </CardContent>
            </Card>
        </section>

        <!-- Data Display & Utility -->
        <section class="space-y-4">
            <h2
                class="font-mono text-2xl font-bold uppercase tracking-brutalist border-b-2 border-foreground pb-2"
            >
                Data Display & Utility
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription
                            >User profile containers with a thick border.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <Avatar
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
                                alt="User 1"
                                size="lg"
                            />
                            <Avatar alt="JD" size="lg" />
                            <Avatar
                                alt="Missing"
                                src="/failed-image.jpg"
                                size="lg"
                            />
                        </div>
                        <div class="flex items-center space-x-4">
                            <Avatar alt="Square" shape="square" size="md" />
                            <Avatar alt="Mini" size="sm" />
                            <Avatar alt="Large" size="xl" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tooltip & Separator</CardTitle>
                        <CardDescription
                            >Micro-interactions and organizational elements.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div
                            class="flex h-5 items-center space-x-4 text-sm font-bold"
                        >
                            <div>Dashboard</div>
                            <Separator orientation="vertical" />
                            <div>Settings</div>
                            <Separator orientation="vertical" />
                            <div>Profile</div>
                        </div>
                        <Separator />
                        <div class="flex flex-wrap gap-4">
                            <Tooltip
                                content="This is a top tooltip"
                                position="top"
                            >
                                <Button variant="outline" size="sm"
                                    >Hover Top</Button
                                >
                            </Tooltip>
                            <Tooltip
                                content="Brutalist styling!"
                                position="right"
                            >
                                <Button variant="outline" size="sm"
                                    >Hover Right</Button
                                >
                            </Tooltip>
                            <Tooltip
                                content="Helpful info down here"
                                position="bottom"
                            >
                                <Button variant="outline" size="sm"
                                    >Hover Bottom</Button
                                >
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    </section>
</div>
