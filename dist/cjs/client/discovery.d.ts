import { z } from "zod";
import { StdioClientTransport } from "./stdio.js";
import { SSEClientTransport } from "./sse.js";
declare const ManifestSchema: z.ZodObject<{
    servers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
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
        name: string;
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
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }>, "many">;
    uiServers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
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
        name: string;
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
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    servers: {
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }[];
    uiServers?: {
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }[] | undefined;
}, {
    servers: {
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }[];
    uiServers?: {
        name: string;
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        description?: string | undefined;
    }[] | undefined;
}>;
export type Manifest = z.infer<typeof ManifestSchema>;
export declare function discoverServers(url: URL): Promise<{
    transports: (SSEClientTransport | StdioClientTransport)[];
    name: string;
    description?: string | undefined;
}[]>;
export {};
//# sourceMappingURL=discovery.d.ts.map