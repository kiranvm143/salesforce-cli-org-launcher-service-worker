# Install and Connect Salesforce CLI Org Launcher

An AI-powered utility, crafted with love by [Kiran Markad](https://www.linkedin.com/in/kiranmarkad).

This guide explains how to install the Chrome extension, install the local companion native host, connect Salesforce CLI, and start opening orgs.

## Why There Are Two Installs

Chrome Web Store installs the browser extension only.

Salesforce CLI runs locally on your computer, and Chrome extensions cannot directly run local CLI commands. To connect the browser extension with Salesforce CLI, install the companion native host once per machine.

## Requirements

- Google Chrome or Chromium.
- Node.js 20 or later.
- Salesforce CLI installed as `sf` or `sfdx`.
- At least one authenticated Salesforce org.
- Salesforce CLI Org Launcher installed from Chrome Web Store.

## Step 1: Install Salesforce CLI

Install Salesforce CLI from Salesforce's official documentation:

```text
https://developer.salesforce.com/tools/salesforcecli
```

Verify it works:

```bash
sf --version
sf org list
```

If your org is not listed, authenticate it:

```bash
sf org login web --alias my-org
```

## Step 2: Install the Chrome Extension

After the extension is approved and published:

1. Open the Chrome Web Store listing for Salesforce CLI Org Launcher.
2. Click **Add to Chrome**.
3. Confirm the Chrome install prompt.
4. Pin the extension from Chrome's Extensions menu if desired.

Chrome Web Store extension ID:

```text
nmjgfcdchchicaophfglfeijceibpkde
```

## Step 3: Install the Companion Native Host

Run this command from Terminal, PowerShell, or Command Prompt:

```bash
npx --yes github:kiranvm143/salesforce-cli-org-launcher-service-worker install
```

The installer detects macOS, Windows, or Linux and runs the correct companion setup automatically.

If your company blocks `npx` or GitHub package installs, use the manual files from this repository's `downloads` folder.

### macOS

Download:

```text
downloads/SalesforceCliOrgLauncherCompanion-mac-linux.zip
```

Install:

```bash
unzip SalesforceCliOrgLauncherCompanion-mac-linux.zip
cd SalesforceCliOrgLauncherCompanion
chmod +x install-mac-linux.sh
./install-mac-linux.sh
```

If macOS asks whether `native-launcher` can access Desktop, Documents, Downloads, or another protected folder, click **Allow** when your Salesforce projects are stored there. This is an Apple privacy permission, not a Chrome permission.

### Linux

Download:

```text
downloads/SalesforceCliOrgLauncherCompanion-mac-linux.zip
```

Install:

```bash
unzip SalesforceCliOrgLauncherCompanion-mac-linux.zip
cd SalesforceCliOrgLauncherCompanion
chmod +x install-mac-linux.sh
./install-mac-linux.sh
```

### Windows Portable Install

Download:

```text
downloads/SalesforceCliOrgLauncherCompanion-windows-portable.zip
```

Install from PowerShell:

```powershell
Expand-Archive .\SalesforceCliOrgLauncherCompanion-windows-portable.zip
cd .\SalesforceCliOrgLauncherCompanion-windows-portable\SalesforceCliOrgLauncherCompanion
powershell -ExecutionPolicy Bypass -File .\install-windows.ps1
```

### Windows One-Click EXE Builder

Download:

```text
downloads/SalesforceCliOrgLauncherCompanion-windows-installer-source.zip
```

Build on a Windows machine:

1. Install Node.js 20 or later.
2. Install Inno Setup 6.
3. Unzip the installer source package.
4. Open PowerShell inside `windows-installer`.
5. Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\build-windows-installer.ps1
```

The output will be:

```text
output\SalesforceCliOrgLauncherCompanionSetup.exe
```

You can distribute that `.exe` to Windows users after testing it in your environment.

## Step 4: Open and Refresh

1. Open Chrome.
2. Click the Salesforce CLI Org Launcher extension icon.
3. Click **Refresh**.
4. Confirm your Salesforce CLI orgs appear.
5. Click **Open** on an org.

## Step 5: Create Groups

1. Open the extension.
2. Go to **Settings**.
3. Create a group.
4. Add orgs to the group from the launcher.
5. Reopen the extension and confirm the group is still available.

Groups, favorites, settings, and collapsed sections are saved locally in Chrome storage.

## Troubleshooting

### CLI Not Detected

Run:

```bash
sf --version
sf org list
```

If these commands fail, install or fix Salesforce CLI first. Then rerun the companion installer and reopen Chrome.

### Native Host Not Detected

Rerun the one-command installer, then restart Chrome:

```bash
npx --yes github:kiranvm143/salesforce-cli-org-launcher-service-worker install
```

### Org Does Not Open

The org session may be expired. Reauthorize it:

```bash
sf org login web --alias my-org
```

Then click **Refresh** in the extension.

### macOS Keeps Asking for Folder Permission

macOS controls access to protected folders such as Desktop, Documents, and Downloads. Allow access for folders where your Salesforce projects live. To reduce prompts, keep Salesforce project roots in a dedicated development folder and configure that folder in extension settings.

### No Orgs or Missing Projects

Open **Settings**, add the folder where your Salesforce projects are stored, save settings, and click **Refresh**.
