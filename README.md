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
| Windows portable install | [`downloads/SalesforceCliOrgLauncherCompanion-windows-portable.zip`](downloads/SalesforceCliOrgLauncherCompanion-windows-portable.zip) |
| Windows installer builder | [`downloads/SalesforceCliOrgLauncherCompanion-windows-installer-source.zip`](downloads/SalesforceCliOrgLauncherCompanion-windows-installer-source.zip) |

The Windows installer builder creates `SalesforceCliOrgLauncherCompanionSetup.exe` on a Windows machine with Inno Setup 6 installed.

## Quick Install

1. Install **Salesforce CLI Org Launcher** from the Chrome Web Store.
2. Install Node.js 20 or later.
3. Install Salesforce CLI and authenticate at least one org.
4. Download the companion ZIP for your operating system from this repository.
5. Unzip it and run the included install script.
6. Open the Chrome extension and click **Refresh**.

Full instructions are in [docs/INSTALL_AND_CONNECT.md](docs/INSTALL_AND_CONNECT.md).

## Chrome Extension ID

The companion packages are configured for the submitted Chrome Web Store extension ID:

```text
nmjgfcdchchicaophfglfeijceibpkde
```

## What This Repo Includes

- End-user companion install ZIP files for macOS, Linux, and Windows.
- Windows installer-builder source for generating a one-click `.exe`.
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
