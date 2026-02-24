import { timeStamp } from "console";
import * as vscode from "vscode";

let lastActivity = Date.now();
let sessionActive = false;
let sessionStart: number | null = null;

const IDLE_LIMIT = 60 * 1000; // 1 minute

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 DevsDash Activated");

  startHeartbeat();

  const typing = vscode.workspace.onDidChangeTextDocument(() =>
    recordActivity("typing"),
  );

  const switchEditor = vscode.window.onDidChangeActiveTextEditor(() =>
    recordActivity("switch_file"),
  );

  context.subscriptions.push(typing, switchEditor);
}

function recordActivity(type: string) {
  const now = Date.now();

  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const language = editor.document.languageId;
  const file = editor.document.fileName;
  const workspace = vscode.workspace.workspaceFolders?.[0]?.name || "unknown";

  if (!sessionActive) {
    sessionActive = true;
    sessionStart = now;
    console.log("🟢 Coding session started");
  }
  lastActivity = now;

  console.log("⚡ Activity:", {
    type,
    language,
    workspace,
  });
}

function startHeartbeat() {
  setInterval(() => {
    const now = Date.now();

    if (sessionActive && now - lastActivity > IDLE_LIMIT) {
      endSession();
    }
  }, 5000);
}

async function endSession() {
  if (!sessionStart) {
    return;
  }

  const duration = Date.now() - sessionStart;

  const editor = vscode.window.activeTextEditor;
  const payload = {
    duration,
    timeStamp: new Date(),
    language: editor?.document.languageId,
    file: editor?.document.fileName,
    workspace: vscode.workspace.workspaceFolders?.[0]?.name,
  };

  console.log("sending", payload);

  try {
    await fetch("http://localhost:3000/api/vscode/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📡 Session sent to DevsDash");
  } catch {
    console.log("❌ Failed to send session");
  }

  sessionActive = false;
  sessionStart = null;
}

export function deactivate() {}
