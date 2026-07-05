# Salesforce CLI Org Launcher Companion

An AI-powered utility, crafted with love by [Kiran Markad](https://www.linkedin.com/in/kiranmarkad).

This public repository hosts the install files and documentation needed to connect the Chrome Web Store extension to Salesforce CLI on a user's computer.

Chrome Web Store installs the browser extension. The files in this repository install the local companion native host required by Chrome Native Messaging.

## Public Homepage

The GitHub Pages homepage for the full extension experience lives at:

```text
docs/index.html
```

It presents the extension as a product page with screenshots, install flow, downloads, privacy notes, and user guidance.

## Download

Choose the package for your operating system:

| Operating system | Download |
| --- | --- |
| macOS or Linux | [`downloads/SalesforceCliOrgLauncherCompanion-mac-linux.zip`](downloads/SalesforceCliOrgLauncherCompanion-mac-linux.zip) |
| Windows one-click installer | [`downloads/SalesforceCliOrgLauncherCompanionSetup.exe`](downloads/SalesforceCliOrgLauncherCompanionSetup.exe) |
| Windows portable install | [`downloads/SalesforceCliOrgLauncherCompanion-windows-portable.zip`](downloads/SalesforceCliOrgLauncherCompanion-windows-portable.zip) |
| Windows installer builder | [`downloads/SalesforceCliOrgLauncherCompanion-windows-installer-source.zip`](downloads/SalesforceCliOrgLauncherCompanion-windows-installer-source.zip) |

Most Windows users should use `SalesforceCliOrgLauncherCompanionSetup.exe`. The installer builder source is kept for managed IT teams that want to rebuild the installer themselves.

## Quick Install

1. Install **Salesforce CLI Org Launcher** from the Chrome Web Store.
2. Install Node.js 20 or later.
3. Install Salesforce CLI and authenticate at least one org.
4. Run the one-command companion installer:

```bash
npx --yes github:kiranvm143/salesforce-cli-org-launcher-service-worker install
```

5. Open the Chrome extension and click **Refresh**.

The command detects macOS, Windows, or Linux and runs the correct bundled installer. On Windows it also smoke-tests the native host and Salesforce CLI detection before finishing. The ZIP files below remain available for manual installation or managed IT distribution.

Full instructions are in [docs/INSTALL_AND_CONNECT.md](docs/INSTALL_AND_CONNECT.md).

## Chrome Extension IDs

The companion packages are configured for the published Chrome Web Store extension ID:

```text
nmjgfcdchchicaophfglfeijceibpkde
```

For safe upgrades and local testing, the companion installer also allows these known launcher IDs:

```text
kanjinfiojebibldeeajnbmgjmdipjjn
aigfbbnieiipffbjinoccnbocfhlkepm
```

If the extension shows **CLI not detected** after install, rerun the one-command companion installer, fully close and reopen Chrome, and then click **Refresh** in the extension. The current Windows companion saves the installer PATH so Chrome native messaging can find the same `sf` command that works in Command Prompt or PowerShell.

## What This Repo Includes

- End-user companion install ZIP files for macOS, Linux, and Windows.
- A Node.js `npx` installer that chooses the right companion package for the current operating system.
- A one-click Windows `.exe` installer and installer-builder source for managed distribution.
- Native messaging setup documentation.
- Privacy policy hosted through GitHub Pages.
- Public service worker source and documentation for transparency.

## What This Repo Does Not Include

- Salesforce passwords, OAuth tokens, or org secrets.
- Full private extension application source.
- User Salesforce org data.
- Analytics, ads, or remote code.

## Required Chrome Permissions

The extension uses only:

- `storage`: saves local preferences, favorites, groups, and cached org metadata.
- `nativeMessaging`: communicates with the installed local companion native host.

The extension does not require broad website access such as "Read and change all your data on all websites."

## Useful Docs

- [Install and connect guide](docs/INSTALL_AND_CONNECT.md)
- [User guide](docs/USER_GUIDE.md)
- [Extension homepage](docs/index.html)
- [Service worker documentation](docs/SERVICE_WORKER.md)
- [Privacy policy](docs/PRIVACY_POLICY.md)
- [Privacy policy page](docs/privacy-policy.html)

## Repository Protection

This repository is public so users can download install files and read documentation. Changes to `main` should go through pull requests and maintainer approval.
