import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import BadgeTestWrapper from "./badge-test-wrapper.svelte";

describe("Badge", () => {
    it("renders with default variant", () => {
        render(BadgeTestWrapper, { props: { text: "Default Badge" } });
        const badge = screen.getByText("Default Badge");
        expect(badge).toBeInTheDocument();
        // Check for common variant classes
        expect(badge).toHaveClass("bg-primary");
    });

    it("renders with destructive variant", () => {
        render(BadgeTestWrapper, { props: { variant: "destructive", text: "Destructive Badge" } });
        const badge = screen.getByText("Destructive Badge");
        expect(badge).toHaveClass("bg-destructive");
    });

    it("renders with outline variant", () => {
        render(BadgeTestWrapper, { props: { variant: "outline", text: "Outline Badge" } });
        const badge = screen.getByText("Outline Badge");
        expect(badge).toHaveClass("text-foreground");
    });

    it("renders with brutalist style", () => {
        render(BadgeTestWrapper, { props: { brutalist: true, text: "Brutalist Badge" } });
        const badge = screen.getByText("Brutalist Badge");
        expect(badge).toHaveClass("border-2");
        expect(badge).toHaveClass("border-foreground");
        expect(badge).toHaveClass("rounded-brutalist");
    });

    it("renders with rounded style", () => {
        render(BadgeTestWrapper, { props: { brutalist: false, text: "Rounded Badge" } });
        const badge = screen.getByText("Rounded Badge");
        expect(badge).toHaveClass("rounded-md");
        expect(badge).not.toHaveClass("rounded-brutalist");
    });
});
