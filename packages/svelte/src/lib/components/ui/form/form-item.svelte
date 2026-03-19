<script lang="ts" module>
    import { getContext, setContext } from "svelte";

    const FORM_ITEM_ID = Symbol("FORM_ITEM_ID");

    export function getFormItemContext() {
        return getContext<{ error: string | boolean | undefined }>(FORM_ITEM_ID);
    }
</script>

<script lang="ts">
    import { cn } from "../../../utils";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        error?: string | boolean;
        children?: import("svelte").Snippet;
    };

    let { class: className, error = false, children, ...rest }: Props = $props();

    const errorState = $state<{ error: string | boolean | undefined }>({ error: undefined });
    setContext(FORM_ITEM_ID, errorState);

    $effect(() => {
        errorState.error = error;
    });
</script>

<div class={cn("space-y-2", className)} {...rest}>
    {@render children?.()}
</div>
