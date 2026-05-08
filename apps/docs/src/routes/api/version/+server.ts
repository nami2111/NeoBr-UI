import { json } from "@sveltejs/kit";

// Static version — update on release
const VERSION = "1.1.0";

export function GET() {
    return json({ version: VERSION });
}
