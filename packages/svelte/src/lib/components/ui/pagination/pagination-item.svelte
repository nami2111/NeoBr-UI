<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLLIElement>;

  let { class: className, children, ...rest }: Props = $props();
</script>

<li class={cn("", className)} {...rest}>
  {@render children?.()}
</li>
