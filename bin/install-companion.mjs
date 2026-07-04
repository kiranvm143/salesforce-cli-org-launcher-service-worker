#!/usr/bin/env node

import { chmod, mkdtemp, readdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const packageSpec = "github:kiranvm143/salesforce-cli-org-launcher-service-worker";
const oneLineCommand = `npx --yes ${packageSpec} install`;

function printHelp() {
  console.log(`Salesforce CLI Org Launcher Companion

Usage:
  salesforce-cli-org-launcher-companion install
  salesforce-cli-org-launcher-companion print-command
  salesforce-cli-org-launcher-companion help

Commands:
  install         Detect the current OS and run the bundled companion installer.
  print-command   Print the recommended one-line command for end users.
  help            Show this message.
`);
}

function currentZipPath() {
  if (process.platform === "win32") {
    return path.join(repoRoot, "downloads", "SalesforceCliOrgLauncherCompanion-windows-portable.zip");
  }
  if (process.platform === "darwin" || process.platform === "linux") {
    return path.join(repoRoot, "downloads", "SalesforceCliOrgLauncherCompanion-mac-linux.zip");
  }
  throw new Error(`Unsupported platform: ${process.platform}`);
}

async function findInstallScript(tempDir) {
  const scriptName = process.platform === "win32" ? "install-windows.ps1" : "install-mac-linux.sh";
  const queue = [tempDir];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      continue;
    }

    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isFile() && entry.name === scriptName) {
        return fullPath;
      }
      if (entry.isDirectory()) {
        queue.push(fullPath);
      }
    }
  }

  throw new Error(`Could not find ${scriptName} inside the companion package.`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      ...options
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} exited with code ${code ?? "unknown"}`));
    });
  });
}

async function extractBundle(zipPath, tempDir) {
  if (process.platform === "win32") {
    await runCommand("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      `Expand-Archive -LiteralPath '${zipPath.replaceAll("'", "''")}' -DestinationPath '${tempDir.replaceAll("'", "''")}' -Force`
    ]);
    return;
  }

  await runCommand("unzip", ["-oq", zipPath, "-d", tempDir]);
}

async function runInstaller(tempDir) {
  const scriptPath = await findInstallScript(tempDir);

  if (process.platform === "win32") {
    await runCommand("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath
    ], {
      cwd: path.dirname(scriptPath)
    });
    return;
  }

  await chmod(scriptPath, 0o755);
  await runCommand(scriptPath, [], { cwd: path.dirname(scriptPath) });
}

async function install() {
  const zipPath = currentZipPath();
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "salesforce-cli-org-launcher-"));

  console.log(`Preparing companion install from ${path.basename(zipPath)}...`);
  await extractBundle(zipPath, tempDir);
  console.log(`Running installer for ${process.platform}...`);
  await runInstaller(tempDir);
  console.log("Companion install finished.");
  console.log("Open the Chrome extension and click Refresh.");
}

async function main() {
  const command = (process.argv[2] ?? "install").toLowerCase();

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "print-command") {
    console.log(oneLineCommand);
    return;
  }

  if (command === "install") {
    await install();
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
