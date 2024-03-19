"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var command_exports = {};
__export(command_exports, {
  actionDescription: () => actionDescription
});
module.exports = __toCommonJS(command_exports);
var import_extra_typings = require("@commander-js/extra-typings");
import_extra_typings.Command.prototype.addDeploymentSelectionOptions = function(action) {
  return this.addOption(
    new import_extra_typings.Option("--url <url>").conflicts(["--prod", "--preview-name", "--deployment-name"]).hideHelp()
  ).addOption(new import_extra_typings.Option("--admin-key <adminKey>").hideHelp()).addOption(
    new import_extra_typings.Option(
      "--prod",
      action + " this project's production deployment."
    ).conflicts(["--preview-name", "--deployment-name", "--url"])
  ).addOption(
    new import_extra_typings.Option(
      "--preview-name <previewName>",
      action + " the preview deployment with the given name."
    ).conflicts(["--prod", "--deployment-name", "--url"])
  ).addOption(
    new import_extra_typings.Option(
      "--deployment-name <deploymentName>",
      action + " the specified deployment."
    ).conflicts(["--prod", "--preview-name", "--url"])
  );
};
function actionDescription(action) {
  return action;
}
//# sourceMappingURL=command.js.map
