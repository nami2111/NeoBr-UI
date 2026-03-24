import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import RadioGroupTestWrapper from "./radio-group-test-wrapper.svelte";

describe("RadioGroup component", () => {
    test("renders radio group with radiogroup role", () => {
        render(RadioGroupTestWrapper);
        const group = screen.getByRole("radiogroup");
        expect(group).toBeInTheDocument();
    });

    test("renders radio items", () => {
        render(RadioGroupTestWrapper);
        const radios = screen.getAllByRole("radio");
        expect(radios.length).toBe(3);
    });

    test("selects a radio item on click", async () => {
        render(RadioGroupTestWrapper);
        const radios = screen.getAllByRole("radio");

        expect(radios[0]).not.toBeChecked();
        await fireEvent.click(radios[0]);
        expect(radios[0]).toBeChecked();
    });

    test("only one item is selected at a time", async () => {
        render(RadioGroupTestWrapper);
        const radios = screen.getAllByRole("radio");

        await fireEvent.click(radios[0]);
        expect(radios[0]).toBeChecked();
        expect(radios[1]).not.toBeChecked();

        await fireEvent.click(radios[1]);
        expect(radios[0]).not.toBeChecked();
        expect(radios[1]).toBeChecked();
    });

    test("renders with initial value", () => {
        render(RadioGroupTestWrapper, { props: { value: "option2" } });
        const radios = screen.getAllByRole("radio");
        expect(radios[1]).toBeChecked();
    });

    test("applies custom className to group", () => {
        render(RadioGroupTestWrapper, { props: { class: "custom-group" } });
        const group = screen.getByRole("radiogroup");
        expect(group).toHaveClass("custom-group");
    });

    test("disabled group disables all items", async () => {
        render(RadioGroupTestWrapper, { props: { disabled: true } });
        const radios = screen.getAllByRole("radio");

        radios.forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    test("renders with gap class", () => {
        render(RadioGroupTestWrapper);
        const group = screen.getByRole("radiogroup");
        expect(group).toHaveClass("grid");
        expect(group).toHaveClass("gap-2");
    });
});
