import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vite-plus/test";
import ErrorBoundaryTestWrapper from "./error-boundary-test-wrapper.svelte";

describe("ErrorBoundary", () => {
    it("renders safe content when no error", () => {
        render(ErrorBoundaryTestWrapper, { props: { shouldThrow: false } });
        expect(screen.getByText("Safe Content")).toBeInTheDocument();
    });

    it("renders fallback UI when error occurs", async () => {
        // We need to suppress console.error as Vitest prints caught errors by default
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        render(ErrorBoundaryTestWrapper, { props: { shouldThrow: true } });

        // Wait for error to propagate
        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
            expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
            // Check for error message
            expect(screen.getByText("Test Error")).toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });

    it("calls onRetry when retry button clicked", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const onRetry = vi.fn();

        render(ErrorBoundaryTestWrapper, { props: { shouldThrow: true, onRetry } });

        await waitFor(() => {
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        await fireEvent.click(screen.getByText("Try Again"));
        expect(onRetry).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});
