<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value: any;
    disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    value: itemValue, 
    disabled = false, 
    class: className, 
    children,
    ...rest 
  }: Props = $props();

  const ctx = getContext<any>("select");

  let isSelected = $derived(ctx.value === itemValue);
</script>

<button
  type="button"
  class={cn(
    "relative flex w-full cursor-pointer select-none items-center rounded-xs px-3 py-2 text-sm font-bold outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground disabled:pointer-events-none disabled:opacity-50",
    isSelected && "bg-accent text-accent-foreground",
    className
  )}
  onclick={() => (ctx.value = itemValue)}
  disabled={disabled}
  role="option"
  aria-selected={isSelected}
  {...rest}
>
  {@render children?.()}
  
  {#if isSelected}
    <span class="ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="miter"
      >
        <path d="M20 6L9 17L4 12" />
      </svg>
    </span>
  {/if}
</button>
