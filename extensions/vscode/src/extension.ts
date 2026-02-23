import * as vscode from "vscode";

let lastActivity = Date.now();

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 DevsDash Activated");

  vscode.window.showInformationMessage("DevsDash tracking started");

  // User typing
  const changeListener = vscode.workspace.onDidChangeTextDocument(() => {
    recordActivity("typing");
  });

  // File saved
  const saveListener = vscode.workspace.onDidSaveTextDocument(() => {
    recordActivity("save");
  });

  // Editor switched
  const editorListener = vscode.window.onDidChangeActiveTextEditor(() => {
    recordActivity("switch_file");
  });

  context.subscriptions.push(changeListener, saveListener, editorListener);
}

function recordActivity(type: string) {
  const now = Date.now();

  // Ignore idle > 5 minutes
  if (now - lastActivity > 5 * 60 * 1000) {
    console.log("⏸️ User was idle");
  }

  lastActivity = now;

  console.log("⚡ Activity:", type, new Date().toLocaleTimeString());
}

export function deactivate() {}
