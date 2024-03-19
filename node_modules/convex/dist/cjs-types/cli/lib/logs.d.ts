import { Context } from "../../bundler/context.js";
type LogDestination = "stdout" | "stderr";
export declare function watchLogs(ctx: Context, url: string, adminKey: string, dest: LogDestination, options?: {
    success: boolean;
    history?: number | boolean;
}): Promise<void>;
export {};
//# sourceMappingURL=logs.d.ts.map