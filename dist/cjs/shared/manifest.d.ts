import { z } from "zod";
import { StdioClientTransport } from "../client/stdio.js";
import { SSEClientTransport } from "../client/sse.js";
declare const serverTransport: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"stdio">;
    command: z.ZodString;
    args: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "stdio";
    command: string;
    args: string[];
}, {
    type: "stdio";
    command: string;
    args: string[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"sse">;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "sse";
    url: string;
}, {
    type: "sse";
    url: string;
}>]>;
type ServerTransport = z.infer<typeof serverTransport>;
export declare const ManifestSchema: z.ZodObject<{
    mcpServers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        transports: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"stdio">;
            command: z.ZodString;
            args: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "stdio";
            command: string;
            args: string[];
        }, {
            type: "stdio";
            command: string;
            args: string[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"sse">;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "sse";
            url: string;
        }, {
            type: "sse";
            url: string;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }>>>;
    uiServers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        transports: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"stdio">;
            command: z.ZodString;
            args: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "stdio";
            command: string;
            args: string[];
        }, {
            type: "stdio";
            command: string;
            args: string[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"sse">;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "sse";
            url: string;
        }, {
            type: "sse";
            url: string;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    mcpServers?: Record<string, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }> | undefined;
    uiServers?: Record<string, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }> | undefined;
}, {
    mcpServers?: Record<string, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }> | undefined;
    uiServers?: Record<string, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }> | undefined;
}>;
export type Manifest = z.infer<typeof ManifestSchema>;
export declare function loadManifest(url: URL): Promise<Manifest>;
export declare function createTransport(transport: ServerTransport): SSEClientTransport | StdioClientTransport;
export {};
//# sourceMappingURL=manifest.d.ts.map