import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import ToggleTestWrapper from "./toggle-test-wrapper.svelte";

describe("Toggle component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(ToggleTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default props", () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button", { name: /toggle me/i });
        expect(toggle).toBeInTheDocument();
    });

    test("has aria-pressed attribute", () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button", { name: /toggle me/i });
        expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    test("toggles pressed state on click", async () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button", { name: /toggle me/i });

        expect(toggle).toHaveAttribute("aria-pressed", "false");
        await fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "true");
        await fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    test("applies default variant classes", () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("border-2");
        expect(toggle).toHaveClass("rounded-brutalist");
    });

    test("applies outline variant", () => {
        render(ToggleTestWrapper, { props: { variant: "outline" } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("bg-transparent");
    });

    test("applies pressed styling", async () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button");

        await fireEvent.click(toggle);
        expect(toggle).toHaveClass("bg-primary");
    });

    test("is disabled when disabled prop is true", () => {
        render(ToggleTestWrapper, { props: { disabled: true } });
        const toggle = screen.getByRole("button");
        expect(toggle).toBeDisabled();
    });

    test("applies custom className", () => {
        render(ToggleTestWrapper, { props: { class: "custom-toggle" } });
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("custom-toggle");
    });

    test("has cursor-pointer class", () => {
        render(ToggleTestWrapper);
        const toggle = screen.getByRole("button");
        expect(toggle).toHaveClass("cursor-pointer");
    });
});
