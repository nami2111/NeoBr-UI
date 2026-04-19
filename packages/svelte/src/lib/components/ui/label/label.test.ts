import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import LabelTestWrapper from "./label-test-wrapper.svelte";

describe("Label component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(LabelTestWrapper, { props: { text: "Email address" } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders label text", () => {
        render(LabelTestWrapper, { props: { text: "Email address" } });
        expect(screen.getByText("Email address")).toBeInTheDocument();
    });

    it("applies for attribute", () => {
        const { container } = render(LabelTestWrapper, {
            props: { text: "Email", for: "email" },
        });
        const label = container.querySelector("label");
        expect(label).toHaveAttribute("for", "email");
    });

    it("applies custom className", () => {
        const { container } = render(LabelTestWrapper, {
            props: { text: "Test", class: "custom-label" },
        });
        const label = container.querySelector("label");
        expect(label).toHaveClass("custom-label");
    });

    it("has default bold styling", () => {
        const { container } = render(LabelTestWrapper);
        const label = container.querySelector("label");
        expect(label).toHaveClass("font-bold");
    });

    it("renders as label element", () => {
        const { container } = render(LabelTestWrapper);
        const label = container.querySelector("label");
        expect(label).toBeInTheDocument();
        expect(label?.tagName).toBe("LABEL");
    });
});
