<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLOListElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<ol
  class={cn(
    "flex flex-wrap items-center gap-1.5 break-words text-sm font-bold text-muted-foreground",
    className
  )}
  {...rest}
>
  {@render children?.()}
</ol>
