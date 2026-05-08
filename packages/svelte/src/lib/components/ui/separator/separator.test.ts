import { render } from "@testing-library/svelte";
import { describe, it, expect } from "vite-plus/test";
import Separator from "./separator.svelte";

describe("Separator", () => {
    it("renders with horizontal orientation by default", () => {
        const { container } = render(Separator);
        const div = container.firstChild as HTMLElement;
        expect(div.style.height).toBe("var(--separator-width)");
        expect(div.style.width).toBe("");
        expect(div.classList.contains("w-full")).toBe(true);
    });

    it("renders with vertical orientation", () => {
        const { container } = render(Separator, { orientation: "vertical" });
        const div = container.firstChild as HTMLElement;
        expect(div.style.width).toBe("var(--separator-width)");
        expect(div.style.height).toBe("");
        expect(div.classList.contains("h-full")).toBe(true);
    });
});
