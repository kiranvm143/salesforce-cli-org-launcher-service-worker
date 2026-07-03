# Service Worker Documentation

## Purpose

The Salesforce CLI Org Launcher service worker is the extension bridge between the popup UI and the local native messaging host.

Chrome extension pages cannot directly run Salesforce CLI commands. The service worker receives popup messages, calls the registered native host through Chrome Native Messaging, stores local cache/settings in Chrome storage, and opens Salesforce org URLs in Chrome tabs.

## Native Host

The service worker talks to this native messaging host:

```text
com.kiran.salesforce_org_launcher
```

The host must be installed and registered on each user machine. Chrome Web Store installation cannot silently install native messaging hosts, so the companion installer is required.

## Permissions

The service worker uses:

```json
["storage", "nativeMessaging"]
```

No broad host permissions are required. The extension does not request permission to read or change data on all websites.

## Message Contract

The popup sends typed messages to the service worker with `chrome.runtime.sendMessage`.

### `ping`

Wakes the service worker and confirms it can respond.

Response:

```json
{ "ok": true, "awake": true }
```

### `detectCli`

Calls the native host with:

```json
{ "action": "detect" }
```

Used to confirm Salesforce CLI is installed and reachable.

### `getData`

Returns Salesforce CLI org/project data.

Request:

```json
{ "type": "getData", "forceRefresh": false }
```

Behavior:

- Reads settings from Chrome local storage.
- Uses cached data when allowed by cache settings.
- Calls the native host with `listProjects` when refresh is needed.
- Stores fresh payload back into Chrome local storage.

Native host request:

```json
{
  "action": "listProjects",
  "roots": ["~/Projects", "~/Development", "~/workspace", "~/Documents"]
}
```

### `getCachedData`

Returns the cached payload and fetch timestamp without calling the native host.

### `openOrg`

Opens a Salesforce org by alias.

Native host request:

```json
{ "action": "openOrg", "alias": "my-org-alias" }
```

If the native host returns a successful URL, the service worker opens that URL in a new Chrome tab.

If the org session is expired, the native host response should include an error. The service worker forwards that error to the popup so the user can reauthorize the org.

### `openExternal`

Opens an extension-approved external URL in a new Chrome tab.

### `getSettings`

Returns saved launcher settings from Chrome local storage.

### `saveSettings`

Saves launcher settings into Chrome local storage.

## Cache Behavior

Default settings:

```ts
{
  roots: ["~/Projects", "~/Development", "~/workspace", "~/Documents"],
  theme: "system",
  autoRefresh: true,
  cacheDurationMinutes: 15
}
```

Cache is bypassed when:

- `forceRefresh` is true.
- Auto-refresh is disabled.
- No cache exists.
- Cache age is older than `cacheDurationMinutes`.

## Service Worker Wake Behavior

The popup sends a `ping` message when it opens. This wakes the Manifest V3 service worker and confirms runtime messaging is working.

## Install Event

On first install, the service worker opens the extension popup onboarding route:

```text
popup.html?onboarding=1
```

This helps users complete companion native host setup.

## Error Handling

Native host calls are wrapped in a timeout. If the native host does not respond, the service worker returns a clear reinstall/reload message.

All message handler errors are returned to the popup as:

```json
{ "ok": false, "error": "..." }
```

## Security Notes

- The service worker does not run remote code.
- The service worker does not read website DOM content.
- The service worker does not request `<all_urls>`.
- Salesforce authentication remains managed by Salesforce CLI.
- Cached org metadata and launcher settings stay in Chrome local storage.
