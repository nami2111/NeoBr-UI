<script lang="ts">
  import { setContext } from "svelte";
  import { cn } from "../../../utils";

  type Props = {
    value?: string | string[];
    type?: "single" | "multiple";
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  };

  let { 
    value = $bindable(undefined), 
    type = "single", 
    class: className, 
    children, 
    ...rest 
  }: Props = $props();

  // Reactive state controlled by the root
  let activeValues = $state<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  // Sync internal state with external prop
  $effect(() => {
    if (Array.isArray(value)) {
      activeValues = value;
    } else if (value !== undefined) {
      activeValues = [value];
    } else {
      activeValues = [];
    }
  });

  function toggleItem(itemValue: string) {
    if (type === "single") {
      const newValue = activeValues.includes(itemValue) ? undefined : itemValue;
      value = newValue as any;
    } else {
      const newValues = activeValues.includes(itemValue)
        ? activeValues.filter((v) => v !== itemValue)
        : [...activeValues, itemValue];
      value = newValues;
    }
  }

  setContext("accordion", {
    get activeValues() { return activeValues; },
    toggleItem
  });
</script>

<div class={cn("w-full border-t-2 border-foreground border-x-2 rounded-brutalist overflow-hidden", className)} {...rest}>
  {@render children?.()}
</div>
