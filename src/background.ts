import type { LauncherPayload, LauncherSettings } from "./types";

const HOST_NAME = "com.kiran.salesforce_org_launcher";
const DEFAULT_SETTINGS: LauncherSettings = {
  roots: ["~/Projects", "~/Development", "~/workspace", "~/Documents"],
  theme: "system",
  autoRefresh: true,
  cacheDurationMinutes: 15
};

type BackgroundRequest =
  | { type: "ping" }
  | { type: "getData"; forceRefresh?: boolean }
  | { type: "getCachedData" }
  | { type: "detectCli" }
  | { type: "openOrg"; alias: string }
  | { type: "openExternal"; url: string }
  | { type: "getSettings" }
  | { type: "saveSettings"; settings: LauncherSettings };

async function getStorage<T>(key: string, fallback: T): Promise<T> {
  const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(items);
    });
  });
  return (result[key] as T | undefined) ?? fallback;
}

async function callNativeHost(request: unknown, timeoutMs = 30_000) {
  return new Promise<unknown>((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      reject(new Error("Native host did not respond before the timeout. Reinstall the companion native host, then reload the extension."));
    }, timeoutMs);

    chrome.runtime.sendNativeMessage(HOST_NAME, request, (response) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(response);
    });
  });
}

async function getCachedData() {
  return getStorage<{ payload?: LauncherPayload; fetchedAt?: string }>("cache", {});
}

async function setCachedData(payload: LauncherPayload) {
  await setLocalStorage({
    cache: {
      payload,
      fetchedAt: new Date().toISOString()
    }
  });
}

async function setLocalStorage(values: Record<string, unknown>) {
  await new Promise<void>((resolve, reject) => {
    chrome.storage.local.set(values, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve();
    });
  });
}

async function createTab(url: string) {
  await new Promise<void>((resolve, reject) => {
    chrome.tabs.create({ url }, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve();
    });
  });
}

async function shouldUseCache(settings: LauncherSettings, forceRefresh: boolean | undefined) {
  if (forceRefresh || !settings.autoRefresh) {
    return false;
  }

  const cache = await getCachedData();
  if (!cache.payload || !cache.fetchedAt) {
    return false;
  }

  const ageMs = Date.now() - new Date(cache.fetchedAt).getTime();
  return ageMs < settings.cacheDurationMinutes * 60_000;
}

async function handleGetData(forceRefresh?: boolean) {
  const settings = await getStorage("settings", DEFAULT_SETTINGS);

  if (await shouldUseCache(settings, forceRefresh)) {
    const cache = await getCachedData();
    if (cache.payload) {
      return { ok: true, payload: cache.payload, cached: true };
    }
  }

  const payload = (await callNativeHost({
    action: "listProjects",
    roots: settings.roots
  })) as LauncherPayload;

  await setCachedData(payload);
  return { ok: true, payload, cached: false };
}

chrome.runtime.onMessage.addListener((message: BackgroundRequest, _sender, sendResponse) => {
  (async () => {
    switch (message.type) {
      case "ping":
        sendResponse({ ok: true, awake: true });
        break;
      case "detectCli":
        sendResponse({ ok: true, cliInfo: await callNativeHost({ action: "detect" }, 10_000) });
        break;
      case "getData":
        sendResponse(await handleGetData(message.forceRefresh));
        break;
      case "getCachedData": {
        const cache = await getCachedData();
        sendResponse({ ok: true, payload: cache.payload, fetchedAt: cache.fetchedAt });
        break;
      }
      case "openOrg": {
        const response = await callNativeHost({ action: "openOrg", alias: message.alias }) as { success: boolean; url?: string; error?: string };
        if (response.success && response.url) {
          await createTab(response.url);
        }
        sendResponse(response);
        break;
      }
      case "openExternal":
        await createTab(message.url);
        sendResponse({ ok: true });
        break;
      case "getSettings":
        sendResponse({ ok: true, settings: await getStorage("settings", DEFAULT_SETTINGS) });
        break;
      case "saveSettings":
        await setLocalStorage({ settings: message.settings });
        sendResponse({ ok: true });
        break;
      default:
        sendResponse({ ok: false, error: "Unknown message." });
    }
  })().catch((error) => {
    sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
  });

  return true;
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    void createTab(chrome.runtime.getURL("popup.html?onboarding=1"));
  }
});
