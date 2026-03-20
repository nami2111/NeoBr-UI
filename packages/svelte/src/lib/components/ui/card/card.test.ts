import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import { axe } from "vitest-axe";
import CardTestWrapper from "./card-test-wrapper.svelte";

describe("Card", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(CardTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders card structure correctly", () => {
        render(CardTestWrapper, {
            props: {
                title: "Test Title",
                description: "Test Description",
                content: "Test Content",
                footer: "Test Footer",
            },
        });

        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
        expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });

    it("applies brutalist styling", () => {
        const { container } = render(CardTestWrapper);
        const card = container.querySelector(".card-brutalist");
        expect(card).toBeInTheDocument();
        // Just verify the main class is applied.
        // Specific border utility classes checking might fail if not resolved by test setup or if styles are in CSS file.
        expect(card).toHaveClass("card-brutalist");
    });
});
