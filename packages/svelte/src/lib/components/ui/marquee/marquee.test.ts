import { render } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import MarqueeTestWrapper from "./marquee-test-wrapper.svelte";

describe("Marquee component", () => {
    it("renders with default props", () => {
        const { container } = render(MarqueeTestWrapper);
        const wrapper = container.querySelector(".group");
        expect(wrapper).toBeInTheDocument();
    });

    it("renders children content (duplicated for scroll)", () => {
        const { container } = render(MarqueeTestWrapper);
        // Marquee renders children twice in inner div for infinite scroll
        const inner = container.querySelector(".flex.min-w-full");
        expect(inner).toBeInTheDocument();
        expect(inner?.textContent).toContain("Scrolling text");
    });

    it("applies left direction by default", () => {
        const { container } = render(MarqueeTestWrapper);
        const inner = container.querySelector(".animate-marquee");
        expect(inner).toBeInTheDocument();
    });

    it("applies right direction", () => {
        const { container } = render(MarqueeTestWrapper, {
            props: { direction: "right" },
        });
        const inner = container.querySelector(".animate-marquee-reverse");
        expect(inner).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(MarqueeTestWrapper, {
            props: { class: "custom-marquee" },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("custom-marquee");
    });

    it("applies custom speed", () => {
        const { container } = render(MarqueeTestWrapper, {
            props: { speed: 10 },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.getPropertyValue("--duration")).toBe("10s");
    });

    it("applies custom gap", () => {
        const { container } = render(MarqueeTestWrapper, {
            props: { gap: "2rem" },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.getPropertyValue("--gap")).toBe("2rem");
    });
});
