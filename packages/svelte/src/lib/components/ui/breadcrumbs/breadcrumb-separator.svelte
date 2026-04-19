<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLLIElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<li
  role="presentation"
  aria-hidden="true"
  class={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  {/if}
</li>
