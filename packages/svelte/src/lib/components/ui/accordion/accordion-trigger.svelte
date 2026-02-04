<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();

  const root = getContext<{
    activeValues: string[];
    toggleItem: (v: string) => void;
  }>("accordion");
  const item = getContext<{ value: string }>("accordion-item");

  if (!root || !item) {
    throw new Error(
      "AccordionTrigger must be used within AccordionItem and Accordion",
    );
  }

  let isOpen = $derived(root.activeValues.includes(item.value));
</script>

<button
  type="button"
  class={cn(
    "flex w-full items-center justify-between py-4 text-sm font-bold transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-4 group active:translate-y-[2px]",
    "border-b-2 border-transparent hover:border-foreground data-[state=open]:border-foreground",
    className,
  )}
  onclick={() => root.toggleItem(item.value)}
  aria-expanded={isOpen}
  {...rest}
>
  {@render children?.()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="square"
    stroke-linejoin="miter"
    class={cn(
      "h-4 w-4 shrink-0 transition-transform duration-200",
      isOpen && "rotate-180",
    )}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</button>
