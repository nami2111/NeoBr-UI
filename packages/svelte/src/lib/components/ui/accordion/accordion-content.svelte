<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();

  const root = getContext<{ 
    activeValues: string[]; 
  }>("accordion");
  const item = getContext<{ value: string }>("accordion-item");

  if (!root || !item) {
    throw new Error("AccordionContent must be used within AccordionItem and Accordion");
  }

  let isOpen = $derived(root.activeValues.includes(item.value));
</script>

{#if isOpen}
  <div
    class={cn("overflow-hidden text-sm font-medium px-4 pb-4 pt-0", className)}
    transition:slide={{ duration: 200 }}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
