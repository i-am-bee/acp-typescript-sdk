"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestSchema = void 0;
exports.loadManifest = loadManifest;
exports.createTransport = createTransport;
const node_fs_1 = require("node:fs");
const zod_1 = require("zod");
const stdio_js_1 = require("../client/stdio.js");
const sse_js_1 = require("../client/sse.js");
const serverTransport = zod_1.z.union([
    zod_1.z.object({
        type: zod_1.z.literal("stdio"),
        command: zod_1.z.string(),
        args: zod_1.z.array(zod_1.z.string()),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("sse"),
        url: zod_1.z.string(),
    }),
]);
exports.ManifestSchema = zod_1.z.object({
    mcpServers: zod_1.z
        .record(zod_1.z.object({
        description: zod_1.z.string().optional(),
        transports: zod_1.z.array(serverTransport),
    }))
        .optional(),
    uiServers: zod_1.z
        .record(zod_1.z.object({
        description: zod_1.z.string().optional(),
        transports: zod_1.z.array(serverTransport),
    }))
        .optional(),
});
async function loadManifest(url) {
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
            manifestDocument = JSON.parse((0, node_fs_1.readFileSync)(url.pathname, "utf8"));
            break;
        default:
            throw new Error(`Unsupported protocol ${url.protocol}`);
    }
    return await exports.ManifestSchema.parseAsync(manifestDocument);
}
function createTransport(transport) {
    switch (transport.type) {
        case "stdio":
            return new stdio_js_1.StdioClientTransport({
                command: transport.command,
                args: transport.args,
            });
        case "sse":
            return new sse_js_1.SSEClientTransport(new URL(transport.url));
    }
}
//# sourceMappingURL=manifest.js.map