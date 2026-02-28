import { timeStamp } from "console";
import * as vscode from "vscode";

type CodingSession = {
  startTime: number;
  endTime: number;
  duration: number;
  language: string;
  project: string;
};

let sessionQueue = [];

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

  const endTime = Date.now();
  const duration = endTime - sessionStart;

  // Detect language
  const editor = vscode.window.activeTextEditor;
  const language = editor?.document.languageId || "unknown";

  // Detect project
  const project = vscode.workspace.workspaceFolders?.[0]?.name || "unknown";

  const session: CodingSession = {
    startTime: sessionStart,
    endTime,
    duration,
    language,
    project,
  };

  // ✅ ADD TO QUEUE
  sessionQueue.push(session);

  console.log("✅ Session queued");
  console.log("Queue size:", sessionQueue.length);

  // reset session
  sessionActive = false;
  sessionStart = null;
}

export function deactivate() {}
