<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Alert, AlertTitle, AlertDescription, Icon } from "@neobr/svelte";
    import { InformationCircleIcon, DangerIcon } from "@hugeicons/core-free-icons";

    const defaultAlert = `<Alert>
    <Icon icon={InformationCircleIcon} class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the cli.
    </AlertDescription>
</Alert>`;

    const destructiveAlert = `<Alert variant="destructive">
    <Icon icon={DangerIcon} class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
        Your session has expired. Please log in again.
    </AlertDescription>
</Alert>`;
</script>

<DocPage title="Alert" description="Displays a callout for user attention.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Default</h2>
            <CodePreview code={defaultAlert}>
                <Alert>
                    <Icon icon={InformationCircleIcon} class="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components to your app using the cli.
                    </AlertDescription>
                </Alert>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Destructive</h2>
            <CodePreview code={destructiveAlert}>
                <Alert variant="destructive">
                    <Icon icon={DangerIcon} class="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your session has expired. Please log in again.
                    </AlertDescription>
                </Alert>
            </CodePreview>
        </section>
    </div>
</DocPage>
