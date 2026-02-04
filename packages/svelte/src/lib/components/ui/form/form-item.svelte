<script lang="ts" module>
  import { getContext, setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";

  const FORM_ITEM_ID = Symbol("FORM_ITEM_ID");

  export function getFormItemContext() {
    return getContext<Writable<{ error?: string | boolean }>>(FORM_ITEM_ID);
  }
</script>

<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLDivElement> & {
    error?: string | boolean;
    children?: import('svelte').Snippet;
  };

  let { class: className, error = false, children, ...rest }: Props = $props();

  const errorStore = writable({ error });
  setContext(FORM_ITEM_ID, errorStore);

  $effect(() => {
    errorStore.set({ error });
  });
</script>

<div class={cn("space-y-2", className)} {...rest}>
  {@render children?.()}
</div>
