<script lang="ts">
    import * as DropdownMenu from "./index";
    import { Button } from "../button";
</script>

<DropdownMenu.DropdownMenu>
    {#snippet trigger()}
        <Button>Open Menu</Button>
    {/snippet}
    <DropdownMenu.DropdownMenuItem onclick={() => console.log("Profile")}>
        Profile
    </DropdownMenu.DropdownMenuItem>
    <DropdownMenu.DropdownMenuItem onclick={() => console.log("Settings")}>
        Settings
    </DropdownMenu.DropdownMenuItem>
</DropdownMenu.DropdownMenu>
