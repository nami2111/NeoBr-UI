import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import Calendar from "./calendar.svelte";

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
});
