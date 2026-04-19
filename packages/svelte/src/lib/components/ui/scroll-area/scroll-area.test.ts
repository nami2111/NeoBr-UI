import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import ScrollAreaTestWrapper from "./scroll-area-test-wrapper.svelte";

describe("ScrollArea component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(ScrollAreaTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders with default vertical orientation", () => {
        const { container } = render(ScrollAreaTestWrapper);
        const area = container.querySelector(".scroll-area");
        expect(area).toBeInTheDocument();
        expect(area).toHaveClass("overflow-y-auto");
        expect(area).toHaveClass("overflow-x-hidden");
    });

    it("renders with horizontal orientation", () => {
        const { container } = render(ScrollAreaTestWrapper, {
            props: { orientation: "horizontal" },
        });
        const area = container.querySelector(".scroll-area");
        expect(area).toHaveClass("overflow-x-auto");
        expect(area).toHaveClass("overflow-y-hidden");
    });

    it("renders with both orientations", () => {
        const { container } = render(ScrollAreaTestWrapper, {
            props: { orientation: "both" },
        });
        const area = container.querySelector(".scroll-area");
        expect(area).toHaveClass("overflow-auto");
    });

    it("applies custom className", () => {
        const { container } = render(ScrollAreaTestWrapper, {
            props: { class: "custom-scroll" },
        });
        const area = container.querySelector(".scroll-area");
        expect(area).toHaveClass("custom-scroll");
    });

    it("has border and shadow classes", () => {
        const { container } = render(ScrollAreaTestWrapper);
        const area = container.querySelector(".scroll-area");
        expect(area).toHaveClass("border-2");
        expect(area).toHaveClass("shadow-brutalist");
    });

    it("renders children content", () => {
        render(ScrollAreaTestWrapper);
        expect(screen.getByText("Scrollable content")).toBeInTheDocument();
    });
});
