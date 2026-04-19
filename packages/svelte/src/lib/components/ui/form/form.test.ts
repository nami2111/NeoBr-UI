import { render, screen } from "@testing-library/svelte";
import { expect, test, describe } from "vite-plus/test";
import { axe } from "vitest-axe";
import FormTestWrapper from "./form-test-wrapper.svelte";

describe("Form system", () => {
    test("should have no accessibility violations", async () => {
        const { container } = render(FormTestWrapper, {
            props: {
                label: "Username",
                description: "Your public name",
                placeholder: "neo",
            },
        });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
    test("renders form items with labels and descriptions", () => {
        render(FormTestWrapper, {
            props: {
                label: "Username",
                description: "Pick a unique name.",
                placeholder: "neo",
            },
        });

        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Pick a unique name.")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("neo")).toBeInTheDocument();
    });

    test("displays error message when error prop is provided", () => {
        render(FormTestWrapper, {
            props: {
                error: "Invalid username",
                label: "Username",
            },
        });

        expect(screen.getByText("Invalid username")).toBeInTheDocument();
    });

    test("applies error styling to input when error is present", () => {
        render(FormTestWrapper, {
            props: {
                error: true,
                placeholder: "test",
            },
        });

        const input = screen.getByPlaceholderText("test");
        expect(input).toHaveClass("border-destructive");
    });

    test("does not display error message when no error is provided", () => {
        render(FormTestWrapper, {
            props: {
                label: "Username",
            },
        });

        expect(screen.queryByText("Invalid username")).not.toBeInTheDocument();
    });
});
