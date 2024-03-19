import { Command } from "@commander-js/extra-typings";
export declare const logs: Command<[], {
    history?: number | true | undefined;
    success: boolean;
} & {
    url?: string | undefined;
    adminKey?: string | undefined;
    prod?: boolean | undefined;
    previewName?: string | undefined;
    deploymentName?: string | undefined;
}>;
//# sourceMappingURL=logs.d.ts.map