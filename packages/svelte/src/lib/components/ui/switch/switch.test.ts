import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import Switch from "./switch.svelte";

describe("Switch component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Switch, { props: { "aria-label": "Toggle" } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders in unchecked state by default", () => {
        render(Switch, { props: { "aria-label": "Toggle" } });
        const button = screen.getByRole("switch");
        expect(button).toHaveAttribute("aria-checked", "false");
    });

    test("toggles state when clicked", async () => {
        const onchange = vi.fn();
        render(Switch, { props: { onchange, "aria-label": "Toggle" } });
        const button = screen.getByRole("switch");

        await fireEvent.click(button);
        expect(button).toHaveAttribute("aria-checked", "true");
        expect(onchange).toHaveBeenCalledWith(true);

        await fireEvent.click(button);
        expect(button).toHaveAttribute("aria-checked", "false");
        expect(onchange).toHaveBeenCalledWith(false);
    });

    test("does not toggle when disabled", async () => {
        render(Switch, { props: { disabled: true, "aria-label": "Toggle" } });
        const button = screen.getByRole("switch");

        await fireEvent.click(button);
        expect(button).toHaveAttribute("aria-checked", "false");
    });
});
