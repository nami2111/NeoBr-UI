import "vite-plus/test";
import type { AxeMatchers } from "vitest-axe/matchers";

// Explicitly define the matcher to avoid import issues
interface CustomMatchers<R = unknown> extends AxeMatchers {
    toHaveNoViolations(): R;
}

declare module "vite-plus/test" {
    interface Assertion<T = any> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
}
