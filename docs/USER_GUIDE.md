# Salesforce CLI Org Launcher User Guide

Salesforce CLI Org Launcher helps you open Salesforce CLI authenticated orgs from Chrome.

## Daily Use

1. Open Chrome.
2. Click the Salesforce CLI Org Launcher extension icon.
3. Use search to find an org by alias, username, project, instance URL, or org ID.
4. Click **Open**.

The extension opens the selected org in a new Chrome tab.

Search updates results while you type and keeps keyboard focus in the search box.

## Org Actions

Each org card can show these actions depending on the org status:

- **Open**: opens the org through Salesforce CLI.
- **Open Setup**: opens Salesforce Setup for that org.
- **Authorize Again**: starts Salesforce CLI web login for expired or unreachable orgs.
- **Check Again**: refreshes only org connection status.
- **Remove Org**: removes the local Salesforce CLI authorization after confirmation. This does not delete the Salesforce org.
- Copy buttons: copy username, org ID, or instance URL.

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

- Auth new org through Salesforce CLI web auth.
- Project root folders.
- Theme.
- Cache duration.
- Auto-refresh behavior.
- Custom org groups.

Project roots tell the companion host where to look for local Salesforce projects.

## Expired Orgs

Expired orgs may still appear because Salesforce CLI can remember old aliases. The extension shows a status badge, disables unsafe open actions, and offers **Authorize Again** where possible.

You can reauthorize from the org card, or use Salesforce CLI directly:

```bash
sf org login web --alias my-org
```

Then click **Refresh**.

If a previous Salesforce CLI login is still occupying OAuth port `1717`, the companion can stop that stale `sf org login web` process and start the new login automatically.

## Privacy

The launcher stores settings and cached org metadata locally in Chrome storage. It does not send org metadata to Kiran Markad, third-party analytics services, or ad networks.

Read the full policy:

```text
https://kiranvm143.github.io/salesforce-cli-org-launcher-service-worker/docs/privacy-policy.html
```
