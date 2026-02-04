<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { value: contentValue, class: className, children, ...rest }: Props = $props();

  const root = getContext<{ 
    value: string | undefined; 
  }>("tabs");

  if (!root) {
    throw new Error("TabsContent must be used within Tabs");
  }

  let isActive = $derived(root.value === contentValue);
</script>

{#if isActive}
  <div
    class={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    role="tabpanel"
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
