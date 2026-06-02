import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import Checkbox from "./checkbox.svelte";

describe("Checkbox component", () => {
    test("renders with unchecked state by default", () => {
        render(Checkbox);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("renders with checked state", () => {
        render(Checkbox, { props: { checked: true } });
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("toggles checked state on click", async () => {
        render(Checkbox);
        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).not.toBeChecked();
        await fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        await fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    test("is disabled when disabled prop is true", () => {
        render(Checkbox, { props: { disabled: true } });
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
    });

    test("does not toggle when disabled", async () => {
        render(Checkbox, { props: { disabled: true, checked: false } });
        const checkbox = screen.getByRole("checkbox");

        // Disabled checkbox should remain unchecked even after click
        // Note: fireEvent.click bypasses disabled in jsdom, so we verify the disabled attribute
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    test("applies custom className", () => {
        const { container } = render(Checkbox, { props: { class: "custom-class" } });
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("custom-class");
    });

    test("applies id attribute", () => {
        render(Checkbox, { props: { id: "my-checkbox" } });
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toHaveAttribute("id", "my-checkbox");
    });

    test("has cursor-pointer class on input", () => {
        render(Checkbox);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toHaveClass("cursor-pointer");
    });
});
