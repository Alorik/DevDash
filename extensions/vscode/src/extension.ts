import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 DevsDash Tracker Activated");

  vscode.window.showInformationMessage("DevsDash Extension Running");
}

export function deactivate() {}

