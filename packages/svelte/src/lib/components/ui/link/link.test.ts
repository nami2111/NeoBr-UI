import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import LinkTestWrapper from "./link-test-wrapper.svelte";

describe("Link component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(LinkTestWrapper, {
            props: { href: "/test", text: "Test Link" },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders as anchor element with href", () => {
        render(LinkTestWrapper, { props: { href: "/dashboard", text: "Dashboard" } });
        const link = screen.getByRole("link", { name: /dashboard/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("applies default variant classes", () => {
        render(LinkTestWrapper, { props: { href: "/", text: "Home" } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-foreground");
        expect(link).toHaveClass("underline");
    });

    it("applies primary variant", () => {
        render(LinkTestWrapper, {
            props: { href: "/", variant: "primary", text: "Primary" },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-primary");
    });

    it("applies secondary variant", () => {
        render(LinkTestWrapper, {
            props: { href: "/", variant: "secondary", text: "Secondary" },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-secondary");
    });

    it("applies muted variant", () => {
        render(LinkTestWrapper, {
            props: { href: "/", variant: "muted", text: "Muted" },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("text-muted-foreground");
    });

    it("applies brutalist letter spacing by default", () => {
        render(LinkTestWrapper, { props: { href: "/", text: "Brutalist" } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("tracking-brutalist");
    });

    it("removes brutalist styling when brutalist is false", () => {
        render(LinkTestWrapper, {
            props: { href: "/", brutalist: false, text: "Normal" },
        });
        const link = screen.getByRole("link");
        expect(link).not.toHaveClass("tracking-brutalist");
    });

    it("applies custom className", () => {
        render(LinkTestWrapper, {
            props: { href: "/", class: "custom-link", text: "Custom" },
        });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("custom-link");
    });

    it("has bold font by default", () => {
        render(LinkTestWrapper, { props: { href: "/", text: "Bold" } });
        const link = screen.getByRole("link");
        expect(link).toHaveClass("font-bold");
    });
});
