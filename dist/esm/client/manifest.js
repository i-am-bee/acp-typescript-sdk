import { readFileSync } from "node:fs";
import { z } from "zod";
import { StdioClientTransport } from "../client/stdio.js";
import { SSEClientTransport } from "../client/sse.js";
const transport = z.union([
    z.object({
        type: z.literal("stdio"),
        command: z.string(),
        args: z.array(z.string()),
    }),
    z.object({
        type: z.literal("sse"),
        url: z.string(),
    }),
]);
export const ManifestSchema = z.object({
    mcpServers: z
        .record(z.object({
        description: z.string().optional(),
        transports: z.array(transport),
    }))
        .optional(),
    uiServers: z
        .record(z.object({
        description: z.string().optional(),
        transports: z.array(transport),
    }))
        .optional(),
});
export async function loadManifest(url) {
    let manifestDocument;
    switch (url.protocol) {
        case "http:":
        case "https:": {
            const res = await fetch(url, {
                headers: { "accept-encoding": "application/json" },
            });
            if (!res.ok)
                throw new Error(`Unable to fetch manifest: ${res.status} - ${await res.text()}`);
            manifestDocument = await res.json();
            break;
        }
        case "file:":
            manifestDocument = JSON.parse(readFileSync(url.pathname, "utf8"));
            break;
        default:
            throw new Error(`Unsupported protocol ${url.protocol}`);
    }
    return await ManifestSchema.parseAsync(manifestDocument);
}
export function createClientTransport(transport) {
    switch (transport.type) {
        case "stdio":
            return new StdioClientTransport({
                command: transport.command,
                args: transport.args,
            });
        case "sse":
            return new SSEClientTransport(new URL(transport.url));
    }
}
//# sourceMappingURL=manifest.js.map