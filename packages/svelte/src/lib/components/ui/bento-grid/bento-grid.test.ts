import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import BentoGridTestWrapper from "./bento-grid-test-wrapper.svelte";

describe("BentoGrid component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(BentoGridTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders grid container", () => {
        const { container } = render(BentoGridTestWrapper);
        const grid = container.querySelector(".grid");
        expect(grid).toBeInTheDocument();
    });

    it("renders grid items with title and description", () => {
        render(BentoGridTestWrapper);
        expect(screen.getByText("Test Item")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("renders grid item with card-brutalist class", () => {
        const { container } = render(BentoGridTestWrapper);
        const item = container.querySelector(".card-brutalist");
        expect(item).toBeInTheDocument();
    });

    it("applies custom className to grid", () => {
        const { container } = render(BentoGridTestWrapper, {
            props: { gridClass: "custom-grid" },
        });
        const grid = container.querySelector(".grid");
        expect(grid).toHaveClass("custom-grid");
    });
});
