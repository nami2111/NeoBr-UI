import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import Input from "./input.svelte";

describe("Input component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Input, { props: { placeholder: "Enter text" } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default props", () => {
        render(Input, { props: { placeholder: "Test input" } });
        const input = screen.getByPlaceholderText("Test input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass("border-2");
        expect(input).toHaveClass("rounded-brutalist");
    });

    test("renders with different types", () => {
        const { rerender } = render(Input, { props: { type: "email", placeholder: "Email" } });
        let input = screen.getByPlaceholderText("Email");
        expect(input).toHaveAttribute("type", "email");

        rerender({ type: "password", placeholder: "Password" });
        input = screen.getByPlaceholderText("Password");
        expect(input).toHaveAttribute("type", "password");

        rerender({ type: "number", placeholder: "Number" });
        input = screen.getByPlaceholderText("Number");
        expect(input).toHaveAttribute("type", "number");
    });

    test("handles value binding", async () => {
        render(Input, { props: { value: "initial" } });
        const input = screen.getByDisplayValue("initial") as HTMLInputElement;

        expect(input.value).toBe("initial");

        await fireEvent.input(input, { target: { value: "updated" } });
        expect(input.value).toBe("updated");
    });

    test("displays error state", () => {
        render(Input, { props: { error: true, placeholder: "Error input" } });
        const input = screen.getByPlaceholderText("Error input");
        expect(input).toHaveClass("border-destructive");
        expect(input).toHaveClass("text-destructive");
    });

    test("displays error message", () => {
        render(Input, { props: { error: "This field is required", placeholder: "Error input" } });
        const input = screen.getByPlaceholderText("Error input");
        expect(input).toHaveClass("border-destructive");
    });

    test("is disabled when disabled prop is true", () => {
        render(Input, { props: { disabled: true, placeholder: "Disabled" } });
        const input = screen.getByPlaceholderText("Disabled");
        expect(input).toBeDisabled();
    });

    test("accepts custom className", () => {
        render(Input, { props: { class: "custom-class", placeholder: "Custom" } });
        const input = screen.getByPlaceholderText("Custom");
        expect(input).toHaveClass("custom-class");
        expect(input).toHaveClass("border-2");
    });

    test("handles oninput event", async () => {
        const handleInput = vi.fn();
        render(Input, { props: { oninput: handleInput, placeholder: "Input test" } });
        const input = screen.getByPlaceholderText("Input test");

        await fireEvent.input(input, { target: { value: "test" } });
        expect(handleInput).toHaveBeenCalled();
    });

    test("supports all standard HTML input attributes", () => {
        render(Input, {
            props: {
                placeholder: "Test",
                required: true,
                minlength: 5,
                maxlength: 10,
                pattern: "[A-Za-z]+",
                autocomplete: "off",
            },
        });
        const input = screen.getByPlaceholderText("Test");
        expect(input).toHaveAttribute("required");
        expect(input).toHaveAttribute("minlength", "5");
        expect(input).toHaveAttribute("maxlength", "10");
        expect(input).toHaveAttribute("pattern", "[A-Za-z]+");
        expect(input).toHaveAttribute("autocomplete", "off");
    });

    test("handles readonly attribute", () => {
        render(Input, { props: { readonly: true, value: "readonly", placeholder: "Readonly" } });
        const input = screen.getByPlaceholderText("Readonly");
        expect(input).toHaveAttribute("readonly");
    });

    test("applies focus styles", async () => {
        render(Input, { props: { placeholder: "Focus test" } });
        const input = screen.getByPlaceholderText("Focus test");

        input.focus();
        expect(document.activeElement).toBe(input);
    });
});
