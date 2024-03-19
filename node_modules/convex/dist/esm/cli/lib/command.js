"use strict";
import { Command, Option } from "@commander-js/extra-typings";
Command.prototype.addDeploymentSelectionOptions = function(action) {
  return this.addOption(
    new Option("--url <url>").conflicts(["--prod", "--preview-name", "--deployment-name"]).hideHelp()
  ).addOption(new Option("--admin-key <adminKey>").hideHelp()).addOption(
    new Option(
      "--prod",
      action + " this project's production deployment."
    ).conflicts(["--preview-name", "--deployment-name", "--url"])
  ).addOption(
    new Option(
      "--preview-name <previewName>",
      action + " the preview deployment with the given name."
    ).conflicts(["--prod", "--deployment-name", "--url"])
  ).addOption(
    new Option(
      "--deployment-name <deploymentName>",
      action + " the specified deployment."
    ).conflicts(["--prod", "--preview-name", "--url"])
  );
};
export function actionDescription(action) {
  return action;
}
//# sourceMappingURL=command.js.map
