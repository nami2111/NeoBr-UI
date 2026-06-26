<script lang="ts">
    import * as DropdownMenu from "./index";
    import { Button } from "../button";
</script>

<DropdownMenu.DropdownMenu>
    {#snippet trigger()}
        <Button>Open Menu</Button>
    {/snippet}
    <DropdownMenu.DropdownMenuItem>Profile</DropdownMenu.DropdownMenuItem>
    <DropdownMenu.DropdownMenuItem>Settings</DropdownMenu.DropdownMenuItem>
</DropdownMenu.DropdownMenu>
