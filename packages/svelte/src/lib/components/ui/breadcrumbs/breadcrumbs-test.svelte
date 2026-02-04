<script lang="ts">
    import {
        Breadcrumbs,
        BreadcrumbList,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbSeparator,
        BreadcrumbPage,
    } from "./index";
</script>

<Breadcrumbs>
    <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
    </BreadcrumbList>
</Breadcrumbs>
