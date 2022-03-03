export type PluginState = 'INSTALLED' | 'UNINSTALL' | 'SAME_NAME';

export interface BriefPluginInfo {
  name: string;
  version: string;
  icon: string;
  desc: string;
  repo: string;
  state: PluginState;
}

export interface PluginInfo extends BriefPluginInfo {
  annotations: {
    'tkeel.io/deployment-name': string;
    'tkeel.io/enable': string;
    'tkeel.io/plugin-port': string;
    'tkeel.io/tag': string;
    'tkeel.io/version': string;
  };
  maintainers: {
    name: string;
    email: string;
    url: string;
  }[];
  timestamp: string;
}
