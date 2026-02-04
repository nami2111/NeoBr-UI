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
    } from "@neobr/svelte";
    import { Home01Icon, Notification02Icon } from "@hugeicons/core-free-icons";

    let showModal = $state(false);
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
                <Modal
                    open={showModal}
                    title="Neo Brutalist Modal"
                    onClose={() => (showModal = false)}
                >
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
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-bold border-b-2 border-foreground pb-2">
            Inputs & Forms
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Direct Input</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="email" placeholder="Enter your email..." />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Form Layout</CardTitle>
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
            Badges & Status
        </h2>
        <div class="flex flex-wrap gap-4 items-center">
            <div class="flex gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
            </div>
            <div class="flex gap-4 border-l-2 border-muted pl-4">
                <Loading />
                <Loading size="lg" />
            </div>
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
</div>
