import { Context } from "../../bundler/context.js";
export declare function checkAuthorization(ctx: Context, acceptOptIns: boolean): Promise<boolean>;
export declare function performLogin(ctx: Context, { overrideAuthUrl, overrideAuthClient, overrideAuthUsername, overrideAuthPassword, overrideAccessToken, open, acceptOptIns, dumpAccessToken, deviceName: deviceNameOverride, }?: {
    overrideAuthUrl?: string;
    overrideAuthClient?: string;
    overrideAuthUsername?: string;
    overrideAuthPassword?: string;
    overrideAccessToken?: string;
    open?: boolean;
    acceptOptIns?: boolean;
    dumpAccessToken?: boolean;
    deviceName?: string;
}): Promise<undefined>;
//# sourceMappingURL=login.d.ts.map