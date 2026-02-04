<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { value: triggerValue, class: className, children, ...rest }: Props = $props();

  const root = getContext<{ 
    value: string | undefined; 
  }>("tabs");

  if (!root) {
    throw new Error("TabsTrigger must be used within Tabs");
  }

  let isActive = $derived(root.value === triggerValue);
</script>

<button
  type="button"
  class={cn(
    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-full rounded-brutalist active:translate-y-[5px] active:shadow-none",
    isActive 
      ? "bg-background text-foreground shadow-brutalist border-2 border-foreground" 
      : "hover:bg-accent hover:text-accent-foreground",
    className
  )}
  onclick={() => (root.value = triggerValue)}
  aria-selected={isActive}
  role="tab"
  {...rest}
>
  {@render children?.()}
</button>
