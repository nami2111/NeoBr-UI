<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";
  import Icon from "../icon/icon.svelte";
  import { ChevronRight } from "@hugeicons/core-free-icons";

  /** Visual separator between breadcrumb items. Defaults to a chevron; override via children. */
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
    <Icon icon={ChevronRight} size={14} strokeWidth={2} />
  {/if}
</li>
