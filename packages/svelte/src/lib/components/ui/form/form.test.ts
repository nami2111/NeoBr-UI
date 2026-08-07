import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { expect, test, describe, vi } from "vite-plus/test";
import { axe } from "vitest-axe";
import FormTestWrapper from "./form-test-wrapper.svelte";
import FormStateTestWrapper from "./form-state-test-wrapper.svelte";
import FormMessage from "./form-message.svelte";

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

    test("message supports deliberate standalone fallback behavior", () => {
        const { container } = render(FormMessage);
        expect(container.children).toHaveLength(0);
    });
});

describe("createFormState", () => {
    test("validates changes and nested field errors", async () => {
        render(FormStateTestWrapper);

        await fireEvent.click(screen.getByText("Invalid Email"));
        expect(screen.getByTestId("email-error")).toHaveTextContent("Invalid email");
        expect(screen.getByTestId("is-dirty")).toHaveTextContent("true");
        expect(screen.getByTestId("is-valid")).toHaveTextContent("false");

        await fireEvent.click(screen.getByText("Invalid Profile"));
        await fireEvent.click(screen.getByText("Validate All"));
        expect(screen.getByTestId("profile-error")).toHaveTextContent("Name is too short");
    });

    test("reset restores cloned initial values without sharing references", async () => {
        render(FormStateTestWrapper);

        await fireEvent.click(screen.getByText("Mutate Profile"));
        expect(screen.getByTestId("profile-name")).toHaveTextContent("Mutated");
        expect(screen.getByTestId("initial-profile-name")).toHaveTextContent("Neo");

        await fireEvent.click(screen.getByText("Reset"));
        expect(screen.getByTestId("profile-name")).toHaveTextContent("Neo");
        expect(screen.getByTestId("is-dirty")).toHaveTextContent("false");
        expect(screen.getByTestId("email-error")).toHaveTextContent("");
    });

    test("does not invent empty strings for missing non-string fields", () => {
        render(FormStateTestWrapper);

        expect(screen.getByTestId("age-type")).toHaveTextContent("undefined");
    });

    test("submits cloned valid values and clears submitting after async failure", async () => {
        const onSubmit = vi.fn(async (_values: unknown) => {
            await Promise.resolve();
            throw new Error("submit failed");
        });

        render(FormStateTestWrapper, { props: { onSubmit } });
        await fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(screen.getByTestId("is-submitting")).toHaveTextContent("false");
        });
        expect(screen.getByTestId("submit-error")).toHaveTextContent("submit failed");

        const submittedValues = onSubmit.mock.calls[0]?.[0] as unknown as {
            email: string;
            profile: { name: string };
        };
        expect(submittedValues).toEqual({
            email: "neo@example.com",
            profile: { name: "Neo" },
        });

        submittedValues.profile.name = "Changed by submit handler";
        expect(screen.getByTestId("profile-name")).toHaveTextContent("Neo");
    });

    test("clears server-set errors when the field changes without validation", async () => {
        render(FormStateTestWrapper, { props: { validateOnChange: false } });

        await fireEvent.click(screen.getByText("Server Error"));
        expect(screen.getByTestId("email-error")).toHaveTextContent("Already taken");

        await fireEvent.click(screen.getByText("Valid Email"));
        expect(screen.getByTestId("email-error")).toHaveTextContent("");
    });

    test("submit keeps Date values as Date instances (no JSON corruption)", async () => {
        const onSubmit = vi.fn();
        render(FormStateTestWrapper, { props: { onSubmit } });

        await fireEvent.click(screen.getByText("Set Joined Date"));
        await fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        const submitted = onSubmit.mock.calls[0]?.[0] as unknown as {
            joined?: Date;
        };
        expect(submitted.joined).toBeInstanceOf(Date);
        expect(submitted.joined?.getTime()).toBe(new Date(2026, 0, 2).getTime());
    });
});
