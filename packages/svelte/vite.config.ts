import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
    plugins: [sveltekit(), svelteTesting()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/tests/setup.ts"],
        include: ["src/**/*.{test,spec}.{js,ts}"],
        exclude: ["**/dist/**", "**/.svelte-kit/**", "**/node_modules/**"],
        globals: true,
    },
});
