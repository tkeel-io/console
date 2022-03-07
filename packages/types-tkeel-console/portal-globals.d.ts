interface PortalConfig {
  // edition: 'free' | 'paid';
  portalName: 'admin' | 'tenant';
  publicPath: string;
  client: {
    themeName: 'tkeel-light' | 'qingcloud-light';
  };
  api: {
    origin?: string; // development
    basePath: string;
  };
  websocket: {
    origin?: string; // development
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
    proxy?: Record<string, any>;
  };
  // production
  builder?: {
    generateSourcemap?: boolean;
  };
  // local development
  mock?: {
    tenantTitle?: string; // tenant
    username?: string; // tenant
    password?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menus?: Array<Record<string, any>>;
  };
}

declare const GLOBAL_PORTAL_CONFIG: Pick<
  PortalConfig,
  'portalName' | 'client' | 'api' | 'websocket' | 'mock'
>;
