import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import DatePicker from "./date-picker.svelte";

describe("DatePicker component", () => {
    it("renders with label", () => {
        render(DatePicker, { props: { label: "Select date" } });
        expect(screen.getByText("Select date")).toBeInTheDocument();
    });

    it("renders without label by default", () => {
        const { container } = render(DatePicker);
        const labelText = container.querySelector("[data-calendar-label]");
        // No label element should be present
        expect(labelText).not.toBeInTheDocument();
    });

    it("renders input segments", () => {
        const { container } = render(DatePicker);
        const inputWrapper = container.querySelector(".input-brutalist");
        expect(inputWrapper).toBeInTheDocument();
    });

    it("renders calendar trigger button", () => {
        const { container } = render(DatePicker);
        const trigger = container.querySelector("button");
        expect(trigger).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(DatePicker, {
            props: { class: "custom-date-picker" },
        });
        const wrapper = container.querySelector(".custom-date-picker");
        expect(wrapper).toBeInTheDocument();
    });
});
