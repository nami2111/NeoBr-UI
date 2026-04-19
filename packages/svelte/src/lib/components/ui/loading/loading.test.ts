import { render } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import Loading from "./loading.svelte";

describe("Loading", () => {
    it("renders correctly with default props", () => {
        const { container } = render(Loading);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
        // and has default classes
        expect(container.firstChild).toHaveClass("text-primary");
        expect(container.firstChild).toHaveClass("h-6");
        expect(container.firstChild).toHaveClass("w-6");
    });

    it("renders with different sizes", () => {
        const { container } = render(Loading, { props: { size: "xl" } });
        expect(container.firstChild).toHaveClass("h-12");
        expect(container.firstChild).toHaveClass("w-12");
    });

    it("renders with different variants", () => {
        const { container } = render(Loading, { props: { variant: "secondary" } });
        expect(container.firstChild).toHaveClass("text-secondary");
    });
});
