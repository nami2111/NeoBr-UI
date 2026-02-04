<script lang="ts">
  import { setContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { value, class: className, children, ...rest }: Props = $props();

  setContext("accordion-item", { 
    get value() { return value; } 
  });
</script>

<div class={cn("border-b-2 border-foreground", className)} {...rest}>
  {@render children?.()}
</div>
