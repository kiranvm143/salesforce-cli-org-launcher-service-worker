# Salesforce CLI Org Launcher Service Worker

Public documentation and service worker source for Salesforce CLI Org Launcher.

This repository intentionally contains only the Manifest V3 service worker layer and documentation. The full extension application, UI, and native-host implementation are not published here.

An AI-powered utility, crafted with ❤️ by [Kiran Markad](https://www.linkedin.com/in/kiranmarkad).

## What Is Included

- `src/background.ts`: Chrome Manifest V3 service worker source.
- `src/types.ts`: Shared message and payload types used by the service worker.
- `manifest.service-worker-example.json`: Minimal manifest snippet showing the service worker registration and permissions.
- `docs/SERVICE_WORKER.md`: Service worker architecture, message contract, cache behavior, and security notes.
- `docs/PRIVACY_POLICY.md`: Privacy policy source.
- `docs/privacy-policy.html`: GitHub Pages friendly privacy policy page.

## What Is Not Included

- Popup UI source.
- Native host source.
- Release packages.
- Chrome Web Store assets.
- Any Salesforce credentials, tokens, or user org data.

## Required Chrome Permissions

The service worker expects only these Chrome permissions:

- `storage`: Saves local settings and cached org metadata.
- `nativeMessaging`: Communicates with the installed local companion native host.

The extension does not require broad website permissions such as `<all_urls>`.

## Privacy Policy Hosting

After GitHub Pages is enabled for this repository, the privacy policy can be hosted from:

```text
https://kiranmarkad.github.io/salesforce-cli-org-launcher-service-worker/docs/privacy-policy.html
```

## Main Branch Protection

This public repository should be readable by everyone, but only trusted maintainers should be able to merge changes into `main`.

Recommended GitHub settings:

- Enable branch protection for `main`.
- Require pull requests before merging.
- Require at least one approval before merge.
- Disable force pushes.
- Do not grant write access to untrusted users.
