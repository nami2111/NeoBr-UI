import { render } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import AspectRatio from "./aspect-ratio.svelte";

describe("AspectRatio component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(AspectRatio, {
            props: { ratio: 16 / 9 },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders with relative w-full classes", () => {
        const { container } = render(AspectRatio);
        const div = container.firstChild as HTMLElement;
        expect(div).toHaveClass("relative");
        expect(div).toHaveClass("w-full");
    });

    it("accepts ratio prop without error", () => {
        const { container } = render(AspectRatio, {
            props: { ratio: 16 / 9 },
        });
        const div = container.firstChild as HTMLElement;
        expect(div).toBeInTheDocument();
        expect(div.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
        const { container } = render(AspectRatio, {
            props: { class: "custom-class" },
        });
        const div = container.firstChild as HTMLElement;
        expect(div).toHaveClass("custom-class");
    });

    it("renders as a div element", () => {
        const { container } = render(AspectRatio);
        const div = container.firstChild as HTMLElement;
        expect(div).toBeInTheDocument();
        expect(div.tagName).toBe("DIV");
    });
});
