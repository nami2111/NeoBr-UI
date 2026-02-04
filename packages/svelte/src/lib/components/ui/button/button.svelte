<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../../utils";

  const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground border-foreground hover:bg-primary/90 shadow-brutalist",
          destructive: "bg-destructive text-destructive-foreground border-foreground hover:bg-destructive/90 shadow-brutalist",
          outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-brutalist",
          secondary: "bg-secondary text-secondary-foreground border-foreground hover:bg-secondary/80 shadow-brutalist",
          ghost: "hover:bg-accent hover:text-accent-foreground border-transparent",
          link: "text-primary underline-offset-4 hover:underline border-transparent",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 px-3",
          lg: "h-11 px-8",
          icon: "h-10 w-10",
        },
        brutalist: {
          true: "rounded-brutalist tracking-brutalist",
          false: "rounded-md",
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default",
        brutalist: true
      },
    }
  );

  type Props = HTMLButtonAttributes & VariantProps<typeof buttonVariants> & {
    brutalist?: boolean;
    children?: import('svelte').Snippet;
  };

  let props: Props = $props();
  let {
    class: className,
    variant = "default",
    size = "default",
    brutalist = true,
    children,
    ...rest
  } = props;
</script>

<button
  class={cn(buttonVariants({ variant, size, brutalist, className }))}
  {...rest}
>
  {@render children?.()}
</button>
