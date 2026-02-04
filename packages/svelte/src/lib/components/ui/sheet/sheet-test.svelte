<script lang="ts">
    import { Sheet } from "./index";
    import { Button } from "../button";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Toggle Sheet</Button>
<Sheet bind:open title="Test Sheet">
    <p>Sheet Content</p>
</Sheet>
