<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { Progress } from "@neobr/svelte";
    import { onMount } from "svelte";

    let progress = $state(13);

    onMount(() => {
        const timer = setTimeout(() => (progress = 66), 500);
        return () => clearTimeout(timer);
    });
</script>

<DocPage
    title="Progress"
    description="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={`<Progress value={${progress}} class="w-[60%]" />`}>
                <Progress value={progress} class="w-full max-w-md" />
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Indeterminate</h2>
            <CodePreview code={`<Progress indeterminate />`}>
                <Progress indeterminate class="w-full max-w-md" />
            </CodePreview>
        </section>
    </div>
</DocPage>
