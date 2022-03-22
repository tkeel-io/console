// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare let __webpack_public_path__: string;

interface Window {
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}

interface PluginConfig {
  portalName: 'admin' | 'tenant';
  publicPath: string;
  client: {
    basePath: string;
  };
  plugin: {
    identify: {
      plugin_id: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entries: Record<string, any>[];
      dependence: { id: string; version: string }[];
    };
  };
  server?: {
    port?: string; // development only
  };

  builder?: {
    generateSourcemap?: boolean; // production only
  };
}

declare const GLOBAL_PLUGIN_CONFIG: Pick<PluginConfig, 'publicPath' | 'client'>;
