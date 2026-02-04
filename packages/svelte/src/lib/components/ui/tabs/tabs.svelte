<script lang="ts">
  import { setContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    value = $bindable(undefined), 
    class: className, 
    children, 
    ...rest 
  }: Props = $props();

  setContext("tabs", {
    get value() { return value; },
    set value(v: string | undefined) { value = v; }
  });
</script>

<div class={cn("w-full", className)} {...rest}>
  {@render children?.()}
</div>
