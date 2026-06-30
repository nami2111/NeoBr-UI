import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import { createRawSnippet } from "svelte";
import Badge from "./badge.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

describe("Badge", () => {
    it("renders with default variant", () => {
        render(Badge, { props: { children: text("Default Badge") } });
        const badge = screen.getByText("Default Badge");
        expect(badge).toBeInTheDocument();
        // Check for common variant classes
        expect(badge).toHaveClass("bg-primary");
    });

    it("renders with destructive variant", () => {
        render(Badge, {
            props: { variant: "destructive", children: text("Destructive Badge") },
        });
        const badge = screen.getByText("Destructive Badge");
        expect(badge).toHaveClass("bg-destructive");
    });

    it("renders with outline variant", () => {
        render(Badge, { props: { variant: "outline", children: text("Outline Badge") } });
        const badge = screen.getByText("Outline Badge");
        expect(badge).toHaveClass("text-foreground");
    });

    it("renders with brutalist radius", () => {
        render(Badge, { props: { radius: "brutalist", children: text("Brutalist Badge") } });
        const badge = screen.getByText("Brutalist Badge");
        expect(badge).toHaveClass("border-2");
        expect(badge).toHaveClass("border-foreground");
        expect(badge).toHaveClass("rounded-brutalist");
    });

    it("renders with rounded radius", () => {
        render(Badge, { props: { radius: "rounded", children: text("Rounded Badge") } });
        const badge = screen.getByText("Rounded Badge");
        expect(badge).toHaveClass("rounded-brutalist-rounded");
        expect(badge).not.toHaveClass("rounded-brutalist");
    });
});
