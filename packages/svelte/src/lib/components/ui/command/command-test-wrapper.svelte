<script lang="ts">
    import Command from "./command.svelte";
    import CommandInput from "./command-input.svelte";
    import CommandList from "./command-list.svelte";
    import CommandEmpty from "./command-empty.svelte";
    import CommandGroup from "./command-group.svelte";
    import CommandItem from "./command-item.svelte";
</script>

<Command>
    <CommandInput />
    <CommandList>
        <CommandEmpty />
        <CommandGroup heading="Suggestions">
            <CommandItem value="calendar">Calendar</CommandItem>
            <CommandItem value="search">Search</CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
    </CommandList>
</Command>
