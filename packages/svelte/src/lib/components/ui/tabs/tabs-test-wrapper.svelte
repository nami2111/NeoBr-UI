<script lang="ts">
    import * as Tabs from ".";

    let {
        value = "tab1",
    }: {
        value?: string;
    } = $props();
</script>

<Tabs.Tabs bind:value class="w-[400px]">
    <Tabs.TabsList>
        <Tabs.TabsTrigger value="tab1">Account</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="tab2">Password</Tabs.TabsTrigger>
    </Tabs.TabsList>
    <Tabs.TabsContent value="tab1">Make changes to your account here.</Tabs.TabsContent>
    <Tabs.TabsContent value="tab2">Change your password here.</Tabs.TabsContent>
</Tabs.Tabs>
