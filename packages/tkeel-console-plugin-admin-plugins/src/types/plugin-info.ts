export interface BriefInstallerInfo {
  name: string;
  version: string;
  repo: string;
  installed?: boolean;
}

export interface PluginInfo extends BriefInstallerInfo {
  installed: boolean;
}
