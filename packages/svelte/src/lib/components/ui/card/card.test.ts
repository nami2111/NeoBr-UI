import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import { axe } from "vitest-axe";
import { createRawSnippet } from "svelte";
import CardTestWrapper from "./card-test-wrapper.svelte";
import Card from "./card.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

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
        const card = container.querySelector(".rounded-brutalist");
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass("border-2");
        expect(card).toHaveClass("shadow-brutalist");
    });

    it("applies the radius prop", () => {
        const { container } = render(Card, {
            props: { radius: "rounded", children: text("Rounded Card") },
        });
        const card = container.firstElementChild;
        expect(card).toHaveClass("rounded-brutalist-rounded");
        expect(card).not.toHaveClass("rounded-brutalist");
    });
});
