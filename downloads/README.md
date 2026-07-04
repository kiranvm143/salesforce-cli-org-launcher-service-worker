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

If users see **CLI not detected**, reinstall the companion package so Chrome's native messaging manifest is refreshed with the current allowlist.

## Install Guide

Read the complete setup guide:

```text
../docs/INSTALL_AND_CONNECT.md
```
