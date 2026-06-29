import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import { createRawSnippet } from "svelte";
import Link from "./link.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

describe("Link component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(Link, {
            props: { href: "/test", children: text("Test Link") },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders as anchor element with href", () => {
        render(Link, { props: { href: "/dashboard", children: text("Dashboard") } });
        const link = screen.getByRole("link", { name: /dashboard/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("applies default variant classes", () => {
        render(Link, { props: { href: "/", children: text("Home") } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-foreground");
        expect(link).toHaveClass("underline");
    });

    it("applies primary variant", () => {
        render(Link, {
            props: { href: "/", variant: "primary", children: text("Primary") },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-primary");
    });

    it("applies secondary variant", () => {
        render(Link, {
            props: { href: "/", variant: "secondary", children: text("Secondary") },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-secondary");
    });

    it("applies muted variant", () => {
        render(Link, {
            props: { href: "/", variant: "muted", children: text("Muted") },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-muted-foreground");
    });

    it("applies brutalist letter spacing by default", () => {
        render(Link, { props: { href: "/", children: text("Brutalist") } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("tracking-brutalist");
    });

    it("applies custom className", () => {
        render(Link, {
            props: { href: "/", class: "custom-link", children: text("Custom") },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("custom-link");
    });

    it("has bold font by default", () => {
        render(Link, { props: { href: "/", children: text("Bold") } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("font-bold");
    });
});
