# Downloads

These files install the Salesforce CLI Org Launcher companion native host.

The Chrome extension itself is installed from Chrome Web Store. The companion native host is installed locally so Chrome can communicate with Salesforce CLI.

## Files

Most users should install with the one-command installer from the repository root:

```bash
npx --yes github:kiranvm143/salesforce-cli-org-launcher-service-worker install
```

The command detects macOS, Windows, or Linux and runs the correct bundled installer. On Windows, the latest installer also smoke-tests the installed native host before finishing.

The current companion also supports the extension's **Auth New Org**, **Authorize Again**, **Open Setup**, and **Remove Org** actions. If Salesforce CLI OAuth port `1717` is occupied by an older Salesforce CLI web-auth process, the companion stops that stale auth process before starting the new login.

Use these files for manual install, offline install, or managed distribution:

| File | Use |
| --- | --- |
| `SalesforceCliOrgLauncherCompanionSetup.exe` | Recommended one-click Windows companion installer. |
| `SalesforceCliOrgLauncherCompanion-mac-linux.zip` | End-user companion installer for macOS and Linux. |
| `SalesforceCliOrgLauncherCompanion-windows-portable.zip` | End-user portable companion installer for Windows using PowerShell. |
| `SalesforceCliOrgLauncherCompanion-windows-installer-source.zip` | Advanced Windows installer project for rebuilding `SalesforceCliOrgLauncherCompanionSetup.exe` with Inno Setup 6. |

## Extension IDs

These packages default to the published Chrome Web Store extension ID:

```text
nmjgfcdchchicaophfglfeijceibpkde
```

They also allow the known launcher IDs used for previous builds and local validation:

```text
kanjinfiojebibldeeajnbmgjmdipjjn
aigfbbnieiipffbjinoccnbocfhlkepm
```

If users see **CLI not detected**, reinstall the companion package so Chrome's native messaging manifest is refreshed with the current allowlist, then fully close and reopen Chrome before clicking **Refresh**.

On Windows, the refreshed packages also detect Salesforce CLI through `where`, prefer runnable shims such as `sf.cmd`, run Salesforce CLI through `cmd.exe`, quote paths with spaces such as `C:\Program Files\sf\bin\sf.cmd`, and save the install-time PATH for Chrome native messaging. This fixes cases where `sf --version` works in Command Prompt but Chrome's native host resolved the extensionless npm shim, inherited an older PATH from Chrome, or failed with `'C:\Program' is not recognized`.

Successful Windows installs print a smoke-test result like:

```json
{"installed":true,"cli":"sf","version":"..."}
```

## Install Guide

Read the complete setup guide:

```text
../docs/INSTALL_AND_CONNECT.md
```
