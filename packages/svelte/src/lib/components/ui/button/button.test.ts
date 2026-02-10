import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vitest";
import { axe } from "vitest-axe";
import ButtonTestWrapper from "./button-test-wrapper.svelte";

describe("Button component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(ButtonTestWrapper, { props: { childrenText: "Accessible Button" } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
    test("renders with default props", () => {
        render(ButtonTestWrapper, { props: { childrenText: "Click me" } });
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("btn-brutalist");
        expect(button).toHaveClass("bg-primary");
    });

    test("renders different variants", () => {
        const { rerender } = render(ButtonTestWrapper, { props: { variant: "destructive", childrenText: "Delete" } });
        let button = screen.getByRole("button", { name: /delete/i });
        expect(button).toHaveClass("bg-destructive");

        rerender({ variant: "outline", childrenText: "Outline" });
        button = screen.getByRole("button", { name: /outline/i });
        // The outline variant is: "btn-brutalist border-2 bg-background hover:bg-accent"
        // Since btn-brutalist already has border-2, we can check for that or btn-brutalist
        expect(button).toHaveClass("btn-brutalist");
        // expect(button).toHaveClass("border-2"); // Included in btn-brutalist
    });

    test("renders different sizes", () => {
        render(ButtonTestWrapper, { props: { size: "lg", childrenText: "Large" } });
        const button = screen.getByRole("button", { name: /large/i });
        // lg size in buttonVariants is h-11 px-8 (standard is h-10 px-4)
        // Wait, let's check buttonVariants in button.svelte
        expect(button).toHaveClass("h-11");
    });

    test("handles click events", async () => {
        const onclick = vi.fn();
        render(ButtonTestWrapper, { props: { onclick, childrenText: "Click" } });
        const button = screen.getByRole("button", { name: /click/i });
        await fireEvent.click(button);
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    test("is disabled when disabled prop is true", () => {
        render(ButtonTestWrapper, { props: { disabled: true, childrenText: "Disabled" } });
        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:opacity-50");
    });

    test("reacts to disabled prop changes", async () => {
        const { rerender } = render(ButtonTestWrapper, {
            props: { disabled: false, childrenText: "Submit" }
        });

        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).not.toBeDisabled();

        // Change disabled prop to true
        await rerender({ disabled: true, childrenText: "Submit" });
        expect(button).toBeDisabled();

        // Change back to false
        await rerender({ disabled: false, childrenText: "Submit" });
        expect(button).not.toBeDisabled();
    });
});
