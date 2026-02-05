<script lang="ts">
    import DocPage from "../../../lib/components/DocPage.svelte";
    import CodePreview from "../../../lib/components/CodePreview.svelte";
    import {
        Command,
        CommandInput,
        CommandList,
        CommandEmpty,
        CommandGroup,
        CommandItem,
        Icon,
    } from "@neobr/svelte";
    import {
        Calendar01Icon,
        SmileIcon,
        CalculatorIcon,
        UserIcon,
        Settings01Icon,
        CreditCardIcon,
    } from "@hugeicons/core-free-icons";

    const usage = `<Command class="max-w-[450px]">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
            <CommandItem>
                <Icon icon={Calendar01Icon} class="mr-2 h-4 w-4" />
                <span>Calendar</span>
            </CommandItem>
            <CommandItem>
                <Icon icon={SmileIcon} class="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
                <Icon icon={CalculatorIcon} class="mr-2 h-4 w-4" />
                <span>Calculator</span>
            </CommandItem>
        </CommandGroup>
        <div class="h-[2px] bg-foreground/10 my-1 mx-2"></div>
        <CommandGroup heading="Settings">
            <CommandItem>
                <Icon icon={UserIcon} class="mr-2 h-4 w-4" />
                <span>Profile</span>
            </CommandItem>
            <CommandItem>
                <Icon icon={CreditCardIcon} class="mr-2 h-4 w-4" />
                <span>Billing</span>
            </CommandItem>
            <CommandItem>
                <Icon icon={Settings01Icon} class="mr-2 h-4 w-4" />
                <span>Settings</span>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</Command>`;
</script>

<DocPage title="Command" description="A fast, composable, unstyled command menu for Svelte.">
    <div class="space-y-12">
        <section class="space-y-4">
            <h2 class="border-foreground border-b-2 pb-2 text-2xl font-bold">Usage</h2>
            <CodePreview code={usage}>
                <div class="w-full max-w-[450px]">
                    <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>
                                    <Icon icon={Calendar01Icon} class="mr-2 h-4 w-4" />
                                    <span>Calendar</span>
                                </CommandItem>
                                <CommandItem>
                                    <Icon icon={SmileIcon} class="mr-2 h-4 w-4" />
                                    <span>Search Emoji</span>
                                </CommandItem>
                                <CommandItem>
                                    <Icon icon={CalculatorIcon} class="mr-2 h-4 w-4" />
                                    <span>Calculator</span>
                                </CommandItem>
                            </CommandGroup>
                            <div class="bg-foreground/10 mx-2 my-1 h-[2px]"></div>
                            <CommandGroup heading="Settings">
                                <CommandItem>
                                    <Icon icon={UserIcon} class="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </CommandItem>
                                <CommandItem>
                                    <Icon icon={CreditCardIcon} class="mr-2 h-4 w-4" />
                                    <span>Billing</span>
                                </CommandItem>
                                <CommandItem>
                                    <Icon icon={Settings01Icon} class="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </CodePreview>
        </section>
    </div>
</DocPage>
