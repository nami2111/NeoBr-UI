<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
        PaginationPrevious,
        PaginationNext,
        PaginationEllipsis,
    } from "@neobr/svelte";

    const usage = `<Pagination>
    <PaginationContent>
        <PaginationItem>
            <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
            <PaginationNext href="#" />
        </PaginationItem>
    </PaginationContent>
</Pagination>`;
</script>

<DocPage
    title="Pagination"
    description="Pagination with page navigation, previous/next buttons and ellipsis."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CodePreview>
        </section>
    </div>
</DocPage>
