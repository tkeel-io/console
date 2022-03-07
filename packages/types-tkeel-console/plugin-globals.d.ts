// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare let __webpack_public_path__: string;

interface Window {
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}

interface PluginConfig {
  portalName: 'admin' | 'tenant';
  publicPath: string;
  basePath: string;
  client: {
    documentTitle: string;
  };
  api: {
    basePath: string;
  };
  websocket: {
    basePath: string;
  };
  plugin: {
    identify: {
      plugin_id: string;
      entries: Record<string, any>[];
      dependence: { id: string; version: string }[];
    };
  };
  // development
  server?: {
    port?: string;
  };
  // production
  builder?: {
    generateSourcemap?: boolean;
  };
}

declare const PLUGIN_GLOBALS: Pick<
  PluginConfig,
  'portalName' | 'publicPath' | 'basePath' | 'client' | 'api' | 'websocket'
>;
