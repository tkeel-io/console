export interface BriefPluginInfo {
  name: string;
  version: string;
  icon: string;
  desc: string;
  repo: string;
  installed: boolean;
}

export interface PluginInfo extends BriefPluginInfo {
  annotations: {
    'tkeel.io/deployment-name': string;
    'tkeel.io/enable': string;
    'tkeel.io/plugin-port': string;
    'tkeel.io/tag': string;
    'tkeel.io/version': string;
  };
  maintainers: [
    {
      name: string;
      email: string;
    }
  ];
  timestamp: string;
}
