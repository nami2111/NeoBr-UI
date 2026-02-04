<script lang="ts">
    import {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
        PaginationPrevious,
        PaginationNext,
        PaginationEllipsis,
    } from "./index";
</script>

<Pagination>
    <PaginationContent>
        <PaginationItem>
            <PaginationPrevious href="/0" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="/2" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
            <PaginationNext href="/3" />
        </PaginationItem>
    </PaginationContent>
</Pagination>
