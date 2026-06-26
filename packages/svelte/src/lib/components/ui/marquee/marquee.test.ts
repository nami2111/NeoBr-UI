import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { expect, describe, it } from "vite-plus/test";
import Marquee from "./marquee.svelte";

const children = createRawSnippet(() => ({ render: () => "Scrolling text" }));

describe("Marquee component", () => {
    it("renders with default props", () => {
        const { container } = render(Marquee, { props: { children } });
        const wrapper = container.querySelector(".group");
        expect(wrapper).toBeInTheDocument();
    });

    it("renders children content (duplicated for scroll)", () => {
        const { container } = render(Marquee, { props: { children } });
        // Marquee renders children twice in inner div for infinite scroll
        const inner = container.querySelector(".flex.min-w-full");
        expect(inner).toBeInTheDocument();
        expect(inner?.textContent).toContain("Scrolling text");
    });

    it("applies left direction by default", () => {
        const { container } = render(Marquee, { props: { children } });
        const inner = container.querySelector(".animate-marquee");
        expect(inner).toBeInTheDocument();
    });

    it("applies right direction", () => {
        const { container } = render(Marquee, {
            props: { direction: "right", children },
        });
        const inner = container.querySelector(".animate-marquee-reverse");
        expect(inner).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(Marquee, {
            props: { class: "custom-marquee", children },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("custom-marquee");
    });

    it("applies custom speed", () => {
        const { container } = render(Marquee, {
            props: { speed: 10, children },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.getPropertyValue("--duration")).toBe("10s");
    });

    it("applies custom gap", () => {
        const { container } = render(Marquee, {
            props: { gap: "2rem", children },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.getPropertyValue("--gap")).toBe("2rem");
    });
});
