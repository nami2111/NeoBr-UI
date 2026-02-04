<script lang="ts">
  import { cn } from "../../../utils";

  type Props = {
    class?: string;
    children?: import("svelte").Snippet;
    [key: string]: any;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<ul
  class={cn("flex flex-row items-center gap-2", className)}
  {...rest}
>
  {@render children?.()}
</ul>
