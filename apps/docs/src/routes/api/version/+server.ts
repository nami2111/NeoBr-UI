import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const response = await fetch('https://registry.npmjs.org/@neobr/svelte/latest');
        const data = await response.json();
        return json({ version: data.version });
    } catch {
        return json({ version: '1.0.0' });
    }
}