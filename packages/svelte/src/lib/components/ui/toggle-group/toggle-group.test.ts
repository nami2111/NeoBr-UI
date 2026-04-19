import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import ToggleGroupTestWrapper from "./toggle-group-test-wrapper.svelte";

describe("ToggleGroup component", () => {
    test("renders toggle group items", () => {
        render(ToggleGroupTestWrapper);
        expect(screen.getByText("Bold")).toBeInTheDocument();
        expect(screen.getByText("Italic")).toBeInTheDocument();
        expect(screen.getByText("Underline")).toBeInTheDocument();
    });

    test("renders as a flex container", () => {
        const { container } = render(ToggleGroupTestWrapper);
        const group = container.querySelector(".flex");
        expect(group).toBeInTheDocument();
    });

    test("single mode selects one item at a time", async () => {
        render(ToggleGroupTestWrapper, { props: { type: "single" } });
        const bold = screen.getByRole("button", { name: /bold/i });
        const italic = screen.getByRole("button", { name: /italic/i });

        await fireEvent.click(bold);
        expect(bold).toHaveAttribute("aria-pressed", "true");

        await fireEvent.click(italic);
        expect(italic).toHaveAttribute("aria-pressed", "true");
        expect(bold).toHaveAttribute("aria-pressed", "false");
    });

    test("single mode deselects on second click", async () => {
        render(ToggleGroupTestWrapper, { props: { type: "single" } });
        const bold = screen.getByRole("button", { name: /bold/i });

        await fireEvent.click(bold);
        expect(bold).toHaveAttribute("aria-pressed", "true");

        await fireEvent.click(bold);
        expect(bold).toHaveAttribute("aria-pressed", "false");
    });

    test("multiple mode allows multiple selections", async () => {
        render(ToggleGroupTestWrapper, { props: { type: "multiple" } });
        const bold = screen.getByRole("button", { name: /bold/i });
        const italic = screen.getByRole("button", { name: /italic/i });

        await fireEvent.click(bold);
        await fireEvent.click(italic);

        expect(bold).toHaveAttribute("aria-pressed", "true");
        expect(italic).toHaveAttribute("aria-pressed", "true");
    });

    test("applies custom className", () => {
        const { container } = render(ToggleGroupTestWrapper, {
            props: { class: "custom-group" },
        });
        const group = container.firstChild as HTMLElement;
        expect(group).toHaveClass("custom-group");
    });
});
