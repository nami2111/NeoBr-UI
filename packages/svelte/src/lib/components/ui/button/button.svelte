<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../../utils";

  const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default:
            "btn-brutalist bg-primary text-primary-foreground hover:bg-primary-hover",
          primary:
            "btn-brutalist bg-primary text-primary-foreground hover:bg-primary-hover",
          destructive:
            "btn-brutalist bg-destructive text-destructive-foreground hover:bg-destructive-hover",
          success:
            "btn-brutalist bg-success text-success-foreground hover:bg-success-hover",
          warning:
            "btn-brutalist bg-warning text-warning-foreground hover:bg-warning-hover",
          secondary:
            "btn-brutalist bg-secondary text-secondary-foreground hover:bg-secondary-hover",
          outline: "btn-brutalist border-2 bg-background hover:bg-accent",
          ghost:
            "hover:bg-accent hover:text-accent-foreground border-2 border-transparent",
          link: "text-primary underline-offset-4 hover:underline border-2 border-transparent",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 px-3",
          lg: "h-11 px-8",
          icon: "h-10 w-10",
        },
        brutalist: {
          true: "rounded-brutalist tracking-[0.1em]",
          false: "rounded-md",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
        brutalist: true,
      },
    },
  );

  type Props = HTMLButtonAttributes &
    VariantProps<typeof buttonVariants> & {
      brutalist?: boolean;
      children?: import("svelte").Snippet;
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
