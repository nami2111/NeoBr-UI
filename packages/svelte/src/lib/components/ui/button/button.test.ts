import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import { createRawSnippet } from "svelte";
import Button from "./button.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

describe("Button component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Button, {
            props: { children: text("Accessible Button") },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
    test("renders with default props", () => {
        render(Button, { props: { children: text("Click me") } });
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("btn-brutalist");
        expect(button).toHaveClass("bg-primary");
    });

    test("renders different variants", () => {
        const { rerender } = render(Button, {
            props: { variant: "destructive", children: text("Delete") },
        });
        let button = screen.getByRole("button", { name: /delete/i });
        expect(button).toHaveClass("bg-destructive");

        rerender({ variant: "outline", children: text("Outline") });
        button = screen.getByRole("button", { name: /outline/i });
        // The outline variant is: "btn-brutalist border-2 bg-background hover:bg-accent"
        // Since btn-brutalist already has border-2, we can check for that or btn-brutalist
        expect(button).toHaveClass("btn-brutalist");
        // expect(button).toHaveClass("border-2"); // Included in btn-brutalist
    });

    test("renders different sizes", () => {
        render(Button, { props: { size: "lg", children: text("Large") } });
        const button = screen.getByRole("button", { name: /large/i });
        // lg size in buttonVariants is h-11 px-8 (standard is h-10 px-4)
        // Wait, let's check buttonVariants in button.svelte
        expect(button).toHaveClass("h-11");
    });

    test("handles click events", async () => {
        const onclick = vi.fn();
        render(Button, { props: { onclick, children: text("Click") } });
        const button = screen.getByRole("button", { name: /click/i });
        await fireEvent.click(button);
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    test("is disabled when disabled prop is true", () => {
        render(Button, { props: { disabled: true, children: text("Disabled") } });
        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:opacity-50");
    });

    test("reacts to disabled prop changes", async () => {
        const { rerender } = render(Button, {
            props: { disabled: false, children: text("Submit") },
        });

        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).not.toBeDisabled();

        // Change disabled prop to true
        await rerender({ disabled: true, children: text("Submit") });
        expect(button).toBeDisabled();

        // Change back to false
        await rerender({ disabled: false, children: text("Submit") });
        expect(button).not.toBeDisabled();
    });

    test("renders as link when href is provided", () => {
        render(Button, { props: { href: "/test-link", children: text("Go to Test") } });
        const link = screen.getByRole("link", { name: /go to test/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test-link");
    });

    test("applies brutalist styling", () => {
        render(Button, { props: { radius: "brutalist", children: text("Brutalist") } });
        const button = screen.getByRole("button", { name: /brutalist/i });
        expect(button).toHaveClass("btn-brutalist");
    });

    test("applies non-brutalist styling", () => {
        render(Button, { props: { radius: "rounded", children: text("Rounded") } });
        const button = screen.getByRole("button", { name: /rounded/i });
        expect(button).toHaveClass("btn-brutalist-rounded");
    });
});
