<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Form,
        FormItem,
        FormLabel,
        FormDescription,
        FormMessage,
        Input,
        Button,
    } from "@neobr/svelte";

    let username = $state("");
    let email = $state("");

    const usage = `<Form>
    <FormItem>
        <FormLabel>Username</FormLabel>
        <Input placeholder="neobr-ui" bind:value={username} />
        <FormDescription> This is your public display name.</FormDescription>
        <FormMessage />
    </FormItem>
    <Button type="submit">Submit</Button>
</Form>`;
</script>

<DocPage title="Form" description="Building forms with Svelte and NeoBr-UI components.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="w-full max-w-sm py-10">
                    <Form class="space-y-6">
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="neobr-ui" bind:value={username} />
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        <Button type="submit" class="w-full">Submit</Button>
                    </Form>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Error State</h2>
            <CodePreview
                code={`<FormItem error>
    <FormLabel>Email</FormLabel>
    <Input value="invalid-email" />
    <FormMessage>Please enter a valid email address.</FormMessage>
</FormItem>`}
            >
                <div class="w-full max-w-sm py-10">
                    <Form>
                        <FormItem error>
                            <FormLabel>Email</FormLabel>
                            <Input value="invalid-email" />
                            <FormMessage>Please enter a valid email address.</FormMessage>
                        </FormItem>
                    </Form>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
