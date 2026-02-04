<script lang="ts">
  import { cn } from "../../../utils";
  import { fly, fade } from "svelte/transition";

  type Props = {
    open?: boolean;
    onClose?: () => void;
    title?: string;
    children?: import("svelte").Snippet;
  };

  let {
    open = $bindable(false),
    onClose = () => {},
    title = undefined,
    children,
  }: Props = $props();

  function handleClose() {
    open = false;
    onClose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && open) {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? "modal-title" : undefined}
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 bg-foreground/30 backdrop-blur-sm"
      transition:fade={{ duration: 200 }}
      onclick={handleClose}
    ></div>

    <!-- Modal Content -->
    <div
      class="relative z-50 w-full max-w-lg border-2 border-foreground bg-background p-6 shadow-brutalist rounded-brutalist"
      transition:fly={{ y: 20, duration: 300 }}
    >
      <div class="flex flex-col space-y-2">
        <div class="flex items-center justify-between">
          {#if title}
            <h2 id="modal-title" class="text-lg font-bold tracking-tight">
              {title}
            </h2>
          {/if}
          <button
            class="rounded-brutalist border-2 border-foreground p-1 hover:bg-accent transition-all active:translate-y-[2px] active:shadow-none"
            onclick={handleClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="pt-4">
          {@render children?.()}
        </div>
      </div>
    </div>
  </div>
{/if}
