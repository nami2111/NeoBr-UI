<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
        Badge,
    } from "@neobr/svelte";

    const basicUsage = `<Table>
    <TableCaption>A list of recent invoices.</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead class="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead class="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell class="font-medium">INV001</TableCell>
            <TableCell><Badge variant="success">Paid</Badge></TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell class="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
            <TableCell class="font-medium">INV002</TableCell>
            <TableCell><Badge variant="warning">Pending</Badge></TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell class="text-right">$150.00</TableCell>
        </TableRow>
    </TableBody>
</Table>`;
</script>

<DocPage title="Table" description="A responsive table component for structured data.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Default Table</h2>
            <CodePreview code={basicUsage}>
                <Table>
                    <TableCaption>A list of recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead class="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell class="font-medium">INV001</TableCell>
                            <TableCell><Badge>Paid</Badge></TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell class="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell class="font-medium">INV002</TableCell>
                            <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                            <TableCell>PayPal</TableCell>
                            <TableCell class="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell class="font-medium">INV003</TableCell>
                            <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
                            <TableCell>Bank Transfer</TableCell>
                            <TableCell class="text-right">$350.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CodePreview>
        </section>
    </div>
</DocPage>
