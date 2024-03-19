declare module "@commander-js/extra-typings" {
    interface Command<Args extends any[] = [], Opts extends OptionValues = {}> {
        /**
         * For a command that talks to the configured dev deployment by default,
         * add flags for talking to prod, preview, or other deployment in the same
         * project.
         *
         * These flags are added to the end of `command` (ordering matters for `--help`
         * output). `action` should look like "Import data into" because it is prefixed
         * onto help strings.
         *
         * The options can be passed to `deploymentSelectionFromOptions`.
         *
         * NOTE: This method only exists at runtime if this file is imported.
         * To help avoid this bug, this method takes in an `ActionDescription` which
         * can only be constructed via `actionDescription` from this file.
         */
        addDeploymentSelectionOptions(action: ActionDescription): Command<Args, Opts & {
            url?: string;
            adminKey?: string;
            prod?: boolean;
            previewName?: string;
            deploymentName?: string;
        }>;
    }
}
declare const tag: unique symbol;
type ActionDescription = string & {
    readonly [tag]: "noop";
};
export declare function actionDescription(action: string): ActionDescription;
export {};
//# sourceMappingURL=command.d.ts.map