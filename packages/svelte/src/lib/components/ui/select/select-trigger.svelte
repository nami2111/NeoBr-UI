<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "../../../utils";
  import { Button } from "../button";

  type Props = {
    class?: string;
    placeholder?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    class: className, 
    placeholder = "Select an option",
    children,
    ...rest 
  }: Props = $props();

  const ctx = getContext<any>("select");

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.open = !ctx.open;
    }
    if (e.key === "Escape") {
      ctx.open = false;
    }
  }
</script>

<button
  type="button"
  bind:this={ctx.triggerElement}
  class={cn(
    "flex h-12 w-full items-center justify-between rounded-sm border-3 border-foreground bg-background px-4 py-2 text-sm font-bold shadow-brutalist transition-all hover:-translate-y-[2px] hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  onclick={() => (ctx.open = !ctx.open)}
  onkeydown={handleKeydown}
  disabled={ctx.disabled}
  aria-expanded={ctx.open}
  {...rest}
>
  <span class="pointer-events-none truncate">
    {#if children}
      {@render children()}
    {:else}
      {placeholder}
    {/if}
  </span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="square"
    stroke-linejoin="miter"
    class={cn("transition-transform duration-200", ctx.open && "rotate-180")}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
</button>
