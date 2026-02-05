<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
        Button,
    } from "@neobr/svelte";

    const cardExample = `<Card class="w-[350px]">
    <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
        <p>Card Content goes here.</p>
    </CardContent>
    <CardFooter class="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
    </CardFooter>
</Card>`;
</script>

<DocPage title="Card" description="Displays a card with header, content, and footer.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Example</h2>
            <CodePreview code={cardExample}>
                <Card class="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content goes here.</p>
                    </CardContent>
                    <CardFooter class="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </CodePreview>
        </section>
    </div>
</DocPage>
