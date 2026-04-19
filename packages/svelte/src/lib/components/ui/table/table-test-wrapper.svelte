<script lang="ts">
    import Table from "./table.svelte";
    import TableHeader from "./table-header.svelte";
    import TableBody from "./table-body.svelte";
    import TableRow from "./table-row.svelte";
    import TableHead from "./table-head.svelte";
    import TableCell from "./table-cell.svelte";
    import TableCaption from "./table-caption.svelte";

    let { tableClass = undefined }: { tableClass?: string } = $props();
</script>

<Table class={tableClass}>
    <TableCaption>User list</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Inactive</TableCell>
            <TableCell>User</TableCell>
        </TableRow>
    </TableBody>
</Table>
