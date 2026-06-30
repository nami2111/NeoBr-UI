<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import { DropdownMenu, DropdownMenuItem, Icon } from "@neobr/svelte";
    import {
        UserIcon,
        Settings01Icon,
        CreditCardIcon,
        Logout01Icon,
        MoreHorizontalIcon,
    } from "@hugeicons/core-free-icons";

    const usage = `<DropdownMenu>
    {#snippet trigger()}
        <span class="...">Open Menu</span>
    {/snippet}
    <DropdownMenuItem>
        <Icon icon={UserIcon} class="mr-2 h-4 w-4" />
        Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
        <Icon icon={CreditCardIcon} class="mr-2 h-4 w-4" />
        Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
        <Icon icon={Settings01Icon} class="mr-2 h-4 w-4" />
        Settings
    </DropdownMenuItem>
    <div class="h-[2px] bg-foreground my-1 mx-2"></div>
    <DropdownMenuItem class="text-destructive hover:bg-destructive/10">
        <Icon icon={Logout01Icon} class="mr-2 h-4 w-4" />
        Log out
    </DropdownMenuItem>
</DropdownMenu>`;

    const triggerClass =
        "border-foreground shadow-brutalist hover:shadow-brutalist-hover tracking-brutalist inline-flex h-10 items-center justify-center rounded-brutalist border-2 bg-primary px-4 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground transition-all hover:-translate-y-[var(--lift-brutalist)] hover:bg-primary-hover active:translate-y-[var(--press-brutalist)] active:shadow-none";
    const iconTriggerClass =
        "border-foreground shadow-brutalist hover:shadow-brutalist-hover inline-flex h-10 w-10 items-center justify-center rounded-brutalist border-2 bg-background p-0 transition-all hover:-translate-y-[var(--lift-brutalist)] hover:bg-accent active:translate-y-[var(--press-brutalist)] active:shadow-none";
</script>

<DocPage
    title="Dropdown Menu"
    description="Displays a menu to the user—such as a set of actions or functions—triggered by a button."
>
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage} class="min-h-[500px]">
                <div class="flex items-center justify-center py-10">
                    <DropdownMenu>
                        {#snippet trigger()}
                            <span class={triggerClass}>Open Menu</span>
                        {/snippet}
                        <DropdownMenuItem>
                            <Icon icon={UserIcon} class="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Icon icon={CreditCardIcon} class="mr-2 h-4 w-4" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Icon icon={Settings01Icon} class="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <div class="bg-foreground mx-2 my-1 h-[2px]"></div>
                        <DropdownMenuItem class="text-destructive hover:bg-destructive/10">
                            <Icon icon={Logout01Icon} class="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenu>
                </div>
            </CodePreview>
        </section>

        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">With Icon Trigger</h2>
            <CodePreview
                code={`<DropdownMenu>
    {#snippet trigger()}
        <span class="...">
            <Icon icon={MoreHorizontalIcon} class="h-6 w-6" />
        </span>
    {/snippet}
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
</DropdownMenu>`}
                class="min-h-[300px]"
            >
                <div class="flex items-center justify-center py-10">
                    <DropdownMenu>
                        {#snippet trigger()}
                            <span class={iconTriggerClass}>
                                <Icon icon={MoreHorizontalIcon} class="h-6 w-6" />
                            </span>
                        {/snippet}
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem class="text-destructive hover:bg-destructive/10"
                            >Archive</DropdownMenuItem
                        >
                    </DropdownMenu>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
