import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import DatePicker from "./date-picker.svelte";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

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

    it("uses shared calendar day state classes when the popover is open", () => {
        const currentDate = today(getLocalTimeZone());
        const selectedDate = new CalendarDate(currentDate.year, currentDate.month, 15);
        const { container } = render(DatePicker, {
            props: {
                value: selectedDate,
                open: true,
                placeholder: selectedDate,
                fixedWeeks: true,
            },
        });

        const dayElements = Array.from(container.querySelectorAll(".rounded-brutalist"));

        expect(container.querySelector("[data-selected]")).toBeInTheDocument();
        expect(container.querySelector("[data-today]")).toBeInTheDocument();
        expect(container.querySelector("[data-outside-month]")).toBeInTheDocument();
        expect(
            dayElements.some((element) => element.classList.contains("data-[selected]:bg-primary")),
        ).toBe(true);
        expect(
            dayElements.some((element) => element.classList.contains("data-[today]:bg-muted")),
        ).toBe(true);
        expect(
            dayElements.some((element) =>
                element.classList.contains("data-[outside-month]:opacity-50"),
            ),
        ).toBe(true);
    });
});
