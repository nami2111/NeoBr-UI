<script lang="ts">
  import { cn } from "../../../utils";
  import { fade } from "svelte/transition";

  type Props = {
    open?: boolean;
    trigger?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  };

  let { 
    open = $bindable(false), 
    trigger, 
    children 
  }: Props = $props();

  function toggle() {
    open = !open;
  }
</script>

<div class="relative inline-block text-left">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div onclick={toggle} class="cursor-pointer">
    {@render trigger?.()}
  </div>

  {#if open}
    <div
      class="absolute right-0 z-50 mt-2 w-56 origin-top-right border-2 border-foreground bg-background shadow-brutalist focus:outline-none rounded-brutalist overflow-hidden"
      transition:fade={{ duration: 100 }}
      role="menu"
      aria-orientation="vertical"
    >
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="py-1" onclick={() => (open = false)}>
        {@render children?.()}
      </div>
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="fixed inset-0 z-40" 
      onclick={() => (open = false)}
    ></div>
  {/if}
</div>
