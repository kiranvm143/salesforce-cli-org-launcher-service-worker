# Salesforce CLI Org Launcher User Guide

Salesforce CLI Org Launcher helps you open Salesforce CLI authenticated orgs from Chrome.

## Daily Use

1. Open Chrome.
2. Click the Salesforce CLI Org Launcher extension icon.
3. Use search to find an org by alias, username, project, instance URL, or org ID.
4. Click **Open**.

The extension opens the selected org in a new Chrome tab.

## Refreshing Orgs

Click **Refresh** when:

- You authenticated a new Salesforce org.
- You changed an org alias.
- You added a new Salesforce project folder.
- An org was expired and you reauthorized it.

The extension uses a local cache so it can open quickly. Refresh asks the local companion host to read Salesforce CLI again.

## Favorites

Use favorites for orgs you open frequently. Favorites are stored locally in Chrome extension storage.

## Groups

Groups let you organize orgs by customer, project, release, or environment.

Typical examples:

- `Internal Dev`
- `QA Sandboxes`
- `Client A`
- `Production`

Create and manage groups from **Settings**. After a group is created, add orgs to it from the launcher. Groups are saved locally and remain available the next time you open the extension.

## Settings

Use **Settings** to manage:

- Project root folders.
- Theme.
- Cache duration.
- Auto-refresh behavior.
- Custom org groups.

Project roots tell the companion host where to look for local Salesforce projects.

## Expired Orgs

Expired orgs may still appear because Salesforce CLI can remember old aliases. If you click **Open** and the org is expired, the extension shows a reauthorization message instead of silently failing.

Reauthorize the org:

```bash
sf org login web --alias my-org
```

Then click **Refresh**.

## Privacy

The launcher stores settings and cached org metadata locally in Chrome storage. It does not send org metadata to Kiran Markad, third-party analytics services, or ad networks.

Read the full policy:

```text
https://kiranvm143.github.io/salesforce-cli-org-launcher-service-worker/docs/privacy-policy.html
```
