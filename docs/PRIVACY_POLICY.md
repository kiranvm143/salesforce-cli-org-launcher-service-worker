# Privacy Policy

Effective date: July 3, 2026

## Overview

Salesforce CLI Org Launcher is a Chrome extension for launching Salesforce CLI authenticated orgs from a local browser popup.

The extension is designed for local developer productivity. It does not sell user data, does not display ads, and does not use third-party analytics.

## Data the Extension Handles

The extension may display and locally cache Salesforce CLI org metadata available on the user's machine, including:

- Org aliases
- Usernames
- Org IDs
- Instance URLs
- Project names
- Salesforce CLI status information

The extension also stores local preferences, including:

- Favorites
- Custom org groups
- Expanded or collapsed UI sections
- Theme preference
- Optional project root folders
- Cache duration

## How Data Is Stored

Extension settings and cached org metadata are stored in Chrome extension local storage on the user's device.

The companion native host runs locally and communicates with the extension through Chrome Native Messaging. The native host uses Salesforce CLI installed on the same machine.

## Data Sharing

The extension does not transmit Salesforce org metadata to the developer, to third-party analytics providers, or to advertising networks.

When a user opens an org, Salesforce CLI and the user's browser may communicate with Salesforce services as part of the normal Salesforce authentication and org-opening flow.

## Permissions

The extension requests:

- `storage`, to save local preferences and cached org metadata.
- `nativeMessaging`, to communicate with the installed local companion native host.

The extension does not request permission to read or change data on all websites.

## Companion Native Host

Chrome extensions cannot silently install native messaging hosts. Users install the companion native host once per machine, usually with the one-line Node.js setup command. The native host runs locally and is required for Salesforce CLI integration.

Project folder scanning is optional. When it is off, Refresh reads Salesforce CLI orgs without scanning protected folders such as Desktop, Documents, or Downloads.

## Data Removal

Users can remove stored extension data by uninstalling the extension from Chrome. Users can also uninstall the companion native host using the platform-specific uninstall process or by removing the installed native host files and registry or manifest entry.

## Contact

Created by Kiran Markad.

LinkedIn: https://www.linkedin.com/in/kiranmarkad
