import { z } from "zod";
import { StdioClientTransport } from "./stdio.js";
import { SSEClientTransport } from "./sse.js";
declare const ManifestSchema: z.ZodObject<{
    servers: z.ZodArray<z.ZodObject<{
        default: z.ZodOptional<z.ZodBoolean>;
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
        default?: boolean | undefined;
    }, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }>, "many">;
    uiServers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        default: z.ZodOptional<z.ZodBoolean>;
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
        default?: boolean | undefined;
    }, {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    servers: {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }[];
    uiServers?: {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }[] | undefined;
}, {
    servers: {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }[];
    uiServers?: {
        transports: ({
            type: "stdio";
            command: string;
            args: string[];
        } | {
            type: "sse";
            url: string;
        })[];
        default?: boolean | undefined;
    }[] | undefined;
}>;
export type Manifest = z.infer<typeof ManifestSchema>;
export declare function discoverServers(url: URL): Promise<{
    transports: (SSEClientTransport | StdioClientTransport)[];
    default?: boolean | undefined;
}[]>;
export {};
//# sourceMappingURL=discovery.d.ts.map