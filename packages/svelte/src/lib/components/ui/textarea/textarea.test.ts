import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import Textarea from "./textarea.svelte";

describe("Textarea component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Textarea, {
            props: { placeholder: "Enter text" },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with default props", () => {
        render(Textarea, { props: { placeholder: "Test textarea" } });
        const textarea = screen.getByPlaceholderText("Test textarea");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveClass("input-brutalist");
    });

    test("handles value binding", async () => {
        render(Textarea, { props: { value: "initial text" } });
        const textarea = screen.getByDisplayValue("initial text") as HTMLTextAreaElement;
        expect(textarea.value).toBe("initial text");

        await fireEvent.input(textarea, { target: { value: "updated text" } });
        expect(textarea.value).toBe("updated text");
    });

    test("displays error state", () => {
        render(Textarea, {
            props: { error: true, placeholder: "Error textarea" },
        });
        const textarea = screen.getByPlaceholderText("Error textarea");
        expect(textarea).toHaveClass("border-destructive");
        expect(textarea).toHaveClass("text-destructive");
    });

    test("is disabled when disabled prop is true", () => {
        render(Textarea, { props: { disabled: true, placeholder: "Disabled" } });
        const textarea = screen.getByPlaceholderText("Disabled");
        expect(textarea).toBeDisabled();
    });

    test("accepts custom className", () => {
        render(Textarea, {
            props: { class: "custom-textarea", placeholder: "Custom" },
        });
        const textarea = screen.getByPlaceholderText("Custom");
        expect(textarea).toHaveClass("custom-textarea");
        expect(textarea).toHaveClass("input-brutalist");
    });

    test("supports rows attribute", () => {
        render(Textarea, { props: { rows: 5, placeholder: "Rows test" } });
        const textarea = screen.getByPlaceholderText("Rows test");
        expect(textarea).toHaveAttribute("rows", "5");
    });

    test("supports maxlength attribute", () => {
        render(Textarea, {
            props: { maxlength: 100, placeholder: "Max length" },
        });
        const textarea = screen.getByPlaceholderText("Max length");
        expect(textarea).toHaveAttribute("maxlength", "100");
    });

    test("supports required attribute", () => {
        render(Textarea, { props: { required: true, placeholder: "Required" } });
        const textarea = screen.getByPlaceholderText("Required");
        expect(textarea).toHaveAttribute("required");
    });

    test("has min-height styling", () => {
        render(Textarea, { props: { placeholder: "Height test" } });
        const textarea = screen.getByPlaceholderText("Height test");
        expect(textarea).toHaveClass("min-h-[80px]");
    });
});
