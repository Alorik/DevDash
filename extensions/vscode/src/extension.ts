import * as vscode from "vscode";

let lastActivity = Date.now();
let sessionActive = false;
let sessionStart: number | null = null;
let totalCodingTime = 0;

const IDLE_LIMIT = 60 * 1000; // 1 min idle

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 DevsDash Activated");

  startHeartbeat();

  const typing = vscode.workspace.onDidChangeTextDocument(() =>
    recordActivity("typing"),
  );

  const save = vscode.workspace.onDidSaveTextDocument(() =>
    recordActivity("save"),
  );

  const switchEditor = vscode.window.onDidChangeActiveTextEditor(() =>
    recordActivity("switch_file"),
  );

  context.subscriptions.push(typing, save, switchEditor);
}

function recordActivity(type: string) {
  const now = Date.now();

  if (!sessionActive) {
    sessionActive = true;
    sessionStart = now;
    console.log("🟢 Coding session started");
  }

  lastActivity = now;
  console.log("⚡ Activity:", type);
}

function startHeartbeat() {
  setInterval(() => {
    const now = Date.now();

    if (sessionActive && now - lastActivity > IDLE_LIMIT) {
      endSession();
    }
  }, 5000);
}

function endSession() {
  if (!sessionStart) return;

  const duration = Date.now() - sessionStart;
  totalCodingTime += duration;

  console.log(
    `🔴 Session ended | Duration: ${(duration / 1000).toFixed(
      1,
    )} sec | Total: ${(totalCodingTime / 1000).toFixed(1)} sec`,
  );

  sessionActive = false;
  sessionStart = null;
}

export function deactivate() {}
