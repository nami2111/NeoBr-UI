<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Tabs,
        TabsList,
        TabsTrigger,
        TabsContent,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
        Button,
        Input,
        Label,
    } from "@neobr/svelte";

    const usage = `<Tabs value="account" class="w-[400px]">
    <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
                <div class="space-y-1">
                    <Label for="name">Name</Label>
                    <Input id="name" value="Pedro Duarte" />
                </div>
                <div class="space-y-1">
                    <Label for="username">Username</Label>
                    <Input id="username" value="@peduarte" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    </TabsContent>
    <TabsContent value="password">
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
                <div class="space-y-1">
                    <Label for="current">Current password</Label>
                    <Input id="current" type="password" />
                </div>
                <div class="space-y-1">
                    <Label for="new">New password</Label>
                    <Input id="new" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save password</Button>
            </CardFooter>
        </Card>
    </TabsContent>
</Tabs>`;
</script>

<DocPage
    title="Tabs"
    description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Tabs value="account" class="w-full max-w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>Make changes to your account here.</CardDescription
                                >
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="grid gap-2">
                                    <Label for="name-demo">Name</Label>
                                    <Input id="name-demo" value="Pedro Duarte" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="username-demo">Username</Label>
                                    <Input id="username-demo" value="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your password here.</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="grid gap-2">
                                    <Label for="current-demo">Current password</Label>
                                    <Input id="current-demo" type="password" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="new-demo">New password</Label>
                                    <Input id="new-demo" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CodePreview>
        </section>
    </div>
</DocPage>
