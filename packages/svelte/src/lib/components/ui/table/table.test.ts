import { render, screen } from "@testing-library/svelte";
import { expect, describe, it } from "vite-plus/test";
import { axe } from "vitest-axe";
import TableTestWrapper from "./table-test-wrapper.svelte";

describe("Table component", () => {
    it("should have no accessibility violations", async () => {
        const { container } = render(TableTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("renders a table element", () => {
        const { container } = render(TableTestWrapper);
        const table = container.querySelector("table");
        expect(table).toBeInTheDocument();
    });

    it("renders table header with column names", () => {
        render(TableTestWrapper);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Role")).toBeInTheDocument();
    });

    it("renders table body with data", () => {
        render(TableTestWrapper);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("renders table caption", () => {
        render(TableTestWrapper);
        expect(screen.getByText("User list")).toBeInTheDocument();
    });

    it("applies brutalist border styling", () => {
        const { container } = render(TableTestWrapper);
        const table = container.querySelector("table");
        expect(table).toHaveClass("border-2");
    });

    it("header cells have bold font", () => {
        const { container } = render(TableTestWrapper);
        const th = container.querySelector("th");
        expect(th).toHaveClass("font-bold");
    });

    it("applies custom className to table", () => {
        const { container } = render(TableTestWrapper, {
            props: { tableClass: "custom-table" },
        });
        const table = container.querySelector("table");
        expect(table).toHaveClass("custom-table");
    });
});
