export type ThemeMode = "light" | "dark" | "system";

export interface OrgRecord {
  alias: string;
  username: string;
  orgId: string;
  instanceUrl: string;
  isSandbox: boolean;
  isScratch: boolean;
  isDevHub: boolean;
  isDefault: boolean;
  lastUsed?: string;
  projectName?: string;
}

export interface ProjectRecord {
  name: string;
  path: string;
  defaultAlias?: string;
  orgs: OrgRecord[];
}

export interface CliInfo {
  installed: boolean;
  cli?: string;
  version?: string;
  error?: string;
}

export interface LauncherPayload {
  cliInfo: CliInfo;
  projects: ProjectRecord[];
  others: OrgRecord[];
  rootsSearched: string[];
  generatedAt: string;
}

export interface LauncherSettings {
  roots: string[];
  theme: ThemeMode;
  autoRefresh: boolean;
  cacheDurationMinutes: number;
}

export interface OrgGroup {
  id: string;
  name: string;
  orgKeys: string[];
}

export interface PopupState {
  data: LauncherPayload | null;
  cliInfo: CliInfo | null;
  settings: LauncherSettings;
  favorites: string[];
  orgGroups: OrgGroup[];
  expandedGroups: string[];
  expandedProjects: string[];
  searchQuery: string;
  loading: boolean;
  error?: string;
  lastRefresh?: string;
}
