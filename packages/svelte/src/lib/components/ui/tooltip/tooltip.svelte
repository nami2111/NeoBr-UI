<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { cn } from "../../../utils";

  type Props = {
    content: string;
    class?: string;
    position?: "top" | "bottom" | "left" | "right";
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    content, 
    class: className, 
    position = "top",
    children, 
    ...rest 
  }: Props = $props();

  let visible = $state(false);

  const positions = {
    top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2",
    bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-2",
    left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2 mr-2",
    right: "top-1/2 -right-2 translate-x-full -translate-y-1/2 ml-2"
  };
</script>

<div 
  class="relative inline-block"
  role="button"
  tabindex="0"
  onmouseenter={() => (visible = true)}
  onmouseleave={() => (visible = false)}
  onfocusin={() => (visible = true)}
  onfocusout={() => (visible = false)}
>
  {@render children?.()}
  
  {#if visible}
    <div
      class={cn(
        "absolute pointer-events-none z-[100] px-3 py-1.5 text-xs font-bold bg-foreground text-background rounded-xs border-2 border-foreground shadow-brutalist whitespace-nowrap",
        positions[position],
        className
      )}
      transition:scale={{ duration: 150, start: 0.9 }}
    >
      {content}
    </div>
  {/if}
</div>
