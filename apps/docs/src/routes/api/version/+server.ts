import { json } from "@sveltejs/kit";
import pkg from "../../../../../../packages/svelte/package.json" with { type: "json" };

/** Live version from the published package — no more manual bumping. */
export function GET() {
    return json({ version: pkg.version });
}
