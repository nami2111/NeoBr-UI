import { render } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import Calendar from "./calendar.svelte";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

describe("Calendar component", () => {
    it("renders with container-brutalist class", () => {
        const { container } = render(Calendar);
        const calendar = container.querySelector(".container-brutalist");
        expect(calendar).toBeInTheDocument();
    });

    it("renders navigation buttons", () => {
        const { container } = render(Calendar);
        const buttons = container.querySelectorAll("button");
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it("renders month heading", () => {
        const { container } = render(Calendar);
        expect(container.textContent).toBeTruthy();
    });

    it("applies custom className", () => {
        const { container } = render(Calendar, {
            props: { class: "custom-calendar" },
        });
        const calendar = container.querySelector(".custom-calendar");
        expect(calendar).toBeInTheDocument();
    });

    it("renders day cells", () => {
        const { container } = render(Calendar);
        const cells = container.querySelectorAll("td");
        expect(cells.length).toBeGreaterThan(0);
    });

    it("applies selected, today, and outside-month day states", () => {
        const currentDate = today(getLocalTimeZone());
        const selectedDate = new CalendarDate(currentDate.year, currentDate.month, 15);
        const { container } = render(Calendar, {
            props: {
                value: selectedDate,
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
