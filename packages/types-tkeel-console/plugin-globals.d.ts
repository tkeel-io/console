// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare let __webpack_public_path__: string;

interface Window {
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}

interface GlobalPluginConfig {
  edition: 'free' | 'paid'; // portal
  portalName: 'admin' | 'tenant';
  publicPath: string;
  basePath?: string; // plugin
  client: {
    themeName: 'qingcloud-light' | 'tkeel-light';
    documentTitle: string | number;
  };
  api: {
    origin?: string;
    basePath: string;
  };
  webSocket: {
    origin?: string;
    basePath: string;
  };
  // local development
  mock?: {
    tenantId?: string | number; // portal tenant
    username?: string | number; // portal tenant
    password?: string | number; // portal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menus?: Array<Record<string, any>>; // portal
  };
}

declare const GLOBAL_PLUGIN_CONFIG: GlobalPluginConfig;
