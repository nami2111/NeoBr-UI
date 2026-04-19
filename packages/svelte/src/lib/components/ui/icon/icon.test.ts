import { render } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import Icon from "./icon.svelte";
import { Home01Icon } from "@hugeicons/core-free-icons";

describe("Icon component", () => {
    it("renders with icon prop", () => {
        const { container } = render(Icon, { props: { icon: Home01Icon } });
        const wrapper = container.querySelector(".inline-flex");
        expect(wrapper).toBeInTheDocument();
    });

    it("applies default size", () => {
        const { container } = render(Icon, { props: { icon: Home01Icon } });
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });

    it("applies custom size", () => {
        const { container } = render(Icon, {
            props: { icon: Home01Icon, size: 32 },
        });
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(Icon, {
            props: { icon: Home01Icon, class: "custom-icon" },
        });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("custom-icon");
    });

    it("applies custom color", () => {
        const { container } = render(Icon, {
            props: { icon: Home01Icon, color: "red" },
        });
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });

    it("applies custom strokeWidth", () => {
        const { container } = render(Icon, {
            props: { icon: Home01Icon, strokeWidth: 2 },
        });
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });
});
