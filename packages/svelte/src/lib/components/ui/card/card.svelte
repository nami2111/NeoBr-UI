<script lang="ts">
  import { cn } from "../../../utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLDivElement> & {
    children?: import("svelte").Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("card-brutalist", className)} {...rest}>
  {@render children?.()}
</div>
