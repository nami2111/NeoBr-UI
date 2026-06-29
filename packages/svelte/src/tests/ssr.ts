import { compile } from "svelte/compiler";
import { render } from "svelte/server";

const internalServerUrl = await import.meta.resolve("svelte/internal/server");

export async function serverRenderSvelte(
    source: string,
    filename: string,
    props: Record<string, unknown> = {},
) {
    let code = compile(source, {
        filename,
        generate: "server",
        dev: false,
    }).js.code;

    code = code
        .replace("from 'svelte/internal/server'", `from '${internalServerUrl}'`)
        .replace('from "svelte/internal/server"', `from '${internalServerUrl}'`)
        .replace(/import \{ scale \} from "svelte\/transition";\n/g, "const scale = undefined;\n")
        .replace(/import \{ cn \} from "\.\.\/\.\.\/\.\.\/utils";\n/g, "")
        .replace(/import \{ cn, RADIUS \} from "\.\.\/\.\.\/\.\.\/utils";\n/g, "")
        .replace(
            /import \{ TRANSITION_BRUTALIST \} from "\.\.\/\.\.\/\.\.\/utils\/motion";\n/g,
            "const TRANSITION_BRUTALIST = { duration: 150 };\n",
        );

    code = `const cn = (...inputs) => inputs.flat().filter(Boolean).join(" ");\n${code}`;
    code = `const RADIUS = { brutalist: "rounded-brutalist", soft: "rounded-brutalist-soft", rounded: "rounded-brutalist-rounded" };\n${code}`;

    const moduleUrl = `data:text/javascript,${encodeURIComponent(code)}#${crypto.randomUUID()}`;
    const module = await import(moduleUrl);

    return render(module.default, { props }).body;
}
