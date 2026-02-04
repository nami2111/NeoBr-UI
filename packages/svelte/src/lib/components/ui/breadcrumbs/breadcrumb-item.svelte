<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<li
  class={cn("inline-flex items-center gap-1.5", className)}
  {...rest}
>
  {@render children?.()}
</li>
