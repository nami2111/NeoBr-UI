import { render, screen, fireEvent } from "@testing-library/svelte";
import { expect, test, describe } from "vitest";
import { axe } from "vitest-axe";
import Slider from "./slider.svelte";

describe("Slider component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(Slider, { props: { "aria-label": "Volume" } });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders with initial value", () => {
        render(Slider, { props: { value: 50, "aria-label": "Volume" } });
        const slider = screen.getByRole("slider");
        expect(slider).toHaveValue("50");
    });

    test("updates value on input", async () => {
        render(Slider, { props: { value: 20, "aria-label": "Volume" } });
        const slider = screen.getByRole("slider");

        await fireEvent.input(slider, { target: { value: "80" } });
        expect(slider).toHaveValue("80");
    });

    test("respects min and max values", () => {
        render(Slider, { props: { min: 10, max: 20, value: 15, "aria-label": "Volume" } });
        const slider = screen.getByRole("slider");
        expect(slider).toHaveAttribute("min", "10");
        expect(slider).toHaveAttribute("max", "20");
    });
});
