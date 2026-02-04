import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Avatar from "./avatar.svelte";

describe("Avatar", () => {
    it("renders the fallback when no src is provided", () => {
        render(Avatar, { alt: "John Doe", fallback: "JD" });
        expect(screen.getByText("JD")).toBeTruthy();
    });

    it("renders image and handles error by showing fallback", async () => {
        const { component } = render(Avatar, { src: "valid.jpg", alt: "User" });
        const img = screen.getByRole("img");
        expect(img).toBeTruthy();

        await fireEvent.error(img);
        expect(screen.getByText("Us")).toBeTruthy(); // Fallback from alt slice
    });
});
