# Downloads

These files install the Salesforce CLI Org Launcher companion native host.

The Chrome extension itself is installed from Chrome Web Store. The companion native host is installed locally so Chrome can communicate with Salesforce CLI.

## Files

Most users should install with the one-command installer from the repository root:

```bash
npx --yes github:kiranvm143/salesforce-cli-org-launcher-service-worker install
```

The command detects macOS, Windows, or Linux and runs the correct bundled installer.

Use these ZIP files for manual install, offline install, or managed distribution:

| File | Use |
| --- | --- |
| `SalesforceCliOrgLauncherCompanion-mac-linux.zip` | End-user companion installer for macOS and Linux. |
| `SalesforceCliOrgLauncherCompanion-windows-portable.zip` | End-user portable companion installer for Windows using PowerShell. |
| `SalesforceCliOrgLauncherCompanion-windows-installer-source.zip` | Windows installer project for building `SalesforceCliOrgLauncherCompanionSetup.exe` with Inno Setup 6. |

## Extension ID

These packages default to the Chrome Web Store extension ID:

```text
nmjgfcdchchicaophfglfeijceibpkde
```

## Install Guide

Read the complete setup guide:

```text
../docs/INSTALL_AND_CONNECT.md
```
