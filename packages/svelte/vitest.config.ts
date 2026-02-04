import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
    plugins: [svelte(), svelteTesting()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/tests/setup.ts"],
        include: ["src/**/*.{test,spec}.{js,ts}"],
        globals: true,
    },
});
