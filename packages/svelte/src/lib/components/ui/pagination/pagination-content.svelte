<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLUListElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<ul
  class={cn("flex flex-row items-center gap-2", className)}
  {...rest}
>
  {@render children?.()}
</ul>
