import { expect, describe, it } from "vite-plus/test";
import { toast } from "./toast.svelte.js";

describe("Toast manager", () => {
    it("adds a toast and returns an id", () => {
        const id = toast.add({ description: "Test toast" });
        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(toast.toasts.length).toBe(1);
        toast.dismiss(id);
    });

    it("adds a toast with title", () => {
        const id = toast.add({ title: "Title", description: "Description" });
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.title).toBe("Title");
        expect(item?.description).toBe("Description");
        toast.dismiss(id);
    });

    it("adds a toast with custom type", () => {
        const id = toast.add({ description: "Success", type: "success" });
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.type).toBe("success");
        toast.dismiss(id);
    });

    it("dismisses a toast by id", () => {
        const id = toast.add({ description: "To dismiss" });
        expect(toast.toasts.length).toBe(1);
        toast.dismiss(id);
        expect(toast.toasts.length).toBe(0);
    });

    it("creates success toast", () => {
        const id = toast.success("Success message");
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.type).toBe("success");
        expect(item?.description).toBe("Success message");
        toast.dismiss(id);
    });

    it("creates error toast", () => {
        const id = toast.error("Error message");
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.type).toBe("error");
        expect(item?.description).toBe("Error message");
        toast.dismiss(id);
    });

    it("creates warning toast", () => {
        const id = toast.warning("Warning message");
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.type).toBe("warning");
        expect(item?.description).toBe("Warning message");
        toast.dismiss(id);
    });

    it("sets default type to default", () => {
        const id = toast.add({ description: "Default toast" });
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.type).toBe("default");
        toast.dismiss(id);
    });

    it("sets default duration to 3000ms", () => {
        const id = toast.add({ description: "Timed toast" });
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.duration).toBe(3000);
        toast.dismiss(id);
    });

    it("allows custom duration", () => {
        const id = toast.add({ description: "Custom duration", duration: 5000 });
        const item = toast.toasts.find((t) => t.id === id);
        expect(item?.duration).toBe(5000);
        toast.dismiss(id);
    });

    it("supports multiple toasts", () => {
        const id1 = toast.add({ description: "First" });
        const id2 = toast.add({ description: "Second" });
        const id3 = toast.add({ description: "Third" });
        expect(toast.toasts.length).toBe(3);
        toast.dismiss(id1);
        toast.dismiss(id2);
        toast.dismiss(id3);
    });

    it("only dismisses the specified toast", () => {
        const id1 = toast.add({ description: "Keep" });
        const id2 = toast.add({ description: "Remove" });
        toast.dismiss(id2);
        expect(toast.toasts.length).toBe(1);
        expect(toast.toasts[0].id).toBe(id1);
        toast.dismiss(id1);
    });
});
