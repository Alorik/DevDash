import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 DevsDash Activated");

  vscode.window.showInformationMessage("🔥 DevsDash is running");

  const command = vscode.commands.registerCommand("devdash.start", () => {
    vscode.window.showInformationMessage("DevsDash command executed");
  });

  context.subscriptions.push(command);
}

export function deactivate() {}
