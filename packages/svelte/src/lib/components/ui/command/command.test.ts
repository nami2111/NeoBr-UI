import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import CommandTestWrapper from "./command-test-wrapper.svelte";
import CommandInput from "./command-input.svelte";
import CommandItem from "./command-item.svelte";
import CommandEmpty from "./command-empty.svelte";

describe("Command component", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(CommandTestWrapper);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("renders command container with brutalist classes", () => {
        const { container } = render(CommandTestWrapper);
        const command = container.querySelector(".rounded-brutalist");
        expect(command).toBeInTheDocument();
    });

    test("renders input with placeholder", () => {
        render(CommandTestWrapper);
        const input = screen.getByPlaceholderText("Type a command or search...");
        expect(input).toBeInTheDocument();
    });

    test("renders command items", () => {
        render(CommandTestWrapper);
        expect(screen.getByText("Calendar")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    test("filters items based on search input", async () => {
        render(CommandTestWrapper);
        const input = screen.getByPlaceholderText("Type a command or search...");

        await fireEvent.input(input, { target: { value: "cal" } });

        expect(screen.getByText("Calendar")).toBeInTheDocument();
        expect(screen.queryByText("Search")).not.toBeInTheDocument();
        expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    });

    test("shows all items when search is cleared", async () => {
        render(CommandTestWrapper);
        const input = screen.getByPlaceholderText("Type a command or search...");

        await fireEvent.input(input, { target: { value: "cal" } });
        expect(screen.queryByText("Search")).not.toBeInTheDocument();

        await fireEvent.input(input, { target: { value: "" } });
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    test("renders group with heading", () => {
        render(CommandTestWrapper);
        expect(screen.getByText("Suggestions")).toBeInTheDocument();
    });

    test("does not render empty state while populated", async () => {
        render(CommandTestWrapper);
        expect(screen.queryByText("No results found.")).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText("Type a command or search...");
        await fireEvent.input(input, { target: { value: "cal" } });

        await waitFor(() => {
            expect(screen.getByText("Calendar")).toBeInTheDocument();
            expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
        });
    });

    test("renders empty state only when search has no matches", async () => {
        render(CommandTestWrapper);
        const input = screen.getByPlaceholderText("Type a command or search...");

        await fireEvent.input(input, { target: { value: "missing" } });

        await waitFor(() => {
            expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
            expect(screen.getByText("No results found.")).toBeInTheDocument();
        });
    });

    test("subcomponents support deliberate standalone fallback behavior", async () => {
        render(CommandInput, { props: { placeholder: "Standalone command" } });
        const input = screen.getByPlaceholderText("Standalone command");
        await fireEvent.input(input, { target: { value: "query" } });
        expect(input).toHaveValue("query");

        render(CommandItem, { props: { value: "standalone", "aria-label": "Standalone item" } });
        expect(screen.getByRole("button", { name: "Standalone item" })).toBeInTheDocument();

        const { container } = render(CommandEmpty);
        expect(container.children).toHaveLength(0);
    });
});
