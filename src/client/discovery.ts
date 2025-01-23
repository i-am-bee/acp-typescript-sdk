import { readFileSync } from "node:fs";
import { z } from "zod";
import { StdioClientTransport } from "./stdio.js";
import { SSEClientTransport } from "./sse.js";
import { ServerCapabilitiesSchema } from "../types.js";

const ManifestSchema = z.object({
  servers: z.array(
    z.object({
      capabilities: ServerCapabilitiesSchema,
      transports: z.array(
        z.union([
          z.object({
            type: z.literal("stdio"),
            command: z.string(),
            args: z.array(z.string()),
          }),
          z.object({
            type: z.literal("sse"),
            url: z.string(),
          }),
        ]),
      ),
    }),
  ),
});
export type Manifest = z.infer<typeof ManifestSchema>;

async function loadManifest(url: URL): Promise<Manifest> {
  let manifestDocument: unknown;
  switch (url.protocol) {
    case "http:":
    case "https:":
      throw new Error("Not implemented");
    case "file:":
      manifestDocument = JSON.parse(readFileSync(url.pathname, "utf8"));
      break;
    default:
      throw new Error(`Unsupported protocol ${url.protocol}`);
  }
  return await ManifestSchema.parseAsync(manifestDocument);
}

function createTransport(
  transport: Manifest["servers"][number]["transports"][number],
) {
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

export async function discoverServers(url: URL) {
  const manifest = await loadManifest(url);
  return manifest.servers.flatMap((server) => {
    return { ...server, transports: server.transports.map(createTransport) };
  });
}
