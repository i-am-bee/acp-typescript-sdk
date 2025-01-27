"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverServers = discoverServers;
const node_fs_1 = require("node:fs");
const zod_1 = require("zod");
const stdio_js_1 = require("./stdio.js");
const sse_js_1 = require("./sse.js");
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
const ManifestSchema = zod_1.z.object({
    servers: zod_1.z.array(zod_1.z.object({
        default: zod_1.z.boolean().optional(),
        transports: zod_1.z.array(serverTransport),
    })),
    uiServers: zod_1.z
        .array(zod_1.z.object({
        default: zod_1.z.boolean().optional(),
        transports: zod_1.z.array(serverTransport),
    }))
        .optional(),
});
async function loadManifest(url) {
    let manifestDocument;
    switch (url.protocol) {
        case "http:":
        case "https:":
            throw new Error("Not implemented");
        case "file:":
            manifestDocument = JSON.parse((0, node_fs_1.readFileSync)(url.pathname, "utf8"));
            break;
        default:
            throw new Error(`Unsupported protocol ${url.protocol}`);
    }
    return await ManifestSchema.parseAsync(manifestDocument);
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
async function discoverServers(url) {
    const manifest = await loadManifest(url);
    return manifest.servers.flatMap((server) => {
        return { ...server, transports: server.transports.map(createTransport) };
    });
}
//# sourceMappingURL=discovery.js.map