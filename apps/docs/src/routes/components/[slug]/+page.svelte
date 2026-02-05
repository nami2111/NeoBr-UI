<script lang="ts">
    import { page } from "$app/state";
    import DocPage from "../../../lib/components/DocPage.svelte";
    import { Alert, AlertTitle, AlertDescription } from "@neobr/svelte";

    const slug = $derived(page.params.slug);
    const title = $derived(
        slug.charAt(0) ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") : "",
    );
</script>

<DocPage {title} description="This component documentation is currently being migrated.">
    <Alert>
        <AlertTitle>Migration in progress</AlertTitle>
        <AlertDescription>
            We are currently splitting our giant showcase into individual component pages. Detailed
            documentation for {title} will be available soon.
        </AlertDescription>
    </Alert>
</DocPage>
