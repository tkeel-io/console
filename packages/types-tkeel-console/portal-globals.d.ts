interface PortalConfig {
  // edition: 'free' | 'paid';
  portalName: 'admin' | 'tenant';
  publicPath: string;
  client: {
    themeName: 'tkeel-light' | 'qingcloud-light';
    showDevTools?: boolean;
  };
  backend: {
    api: {
      origin?: string; // development only
      basePath: string;
    };
    websocket: {
      origin?: string; // development only
      basePath: string;
    };
  };
  server?: {
    port?: string; // development only
    proxy?: Record<string, string | { target: string; ws: boolean }>; // development only
  };
  builder?: {
    generateSourcemap?: boolean; // production only
  };
  plugin: {
    identify: {
      plugin_id: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entries: Record<string, any>[];
      dependence: { id: string; version: string }[];
    };
  };
  // local development
  mock?: {
    tenantTitle?: string; // tenant only
    username?: string; // tenant only
    password?: string;
    documents?: {
      baseURL: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menus?: Array<Record<string, any>>;
  };
}

declare const GLOBAL_PORTAL_CONFIG: Pick<
  PortalConfig,
  'portalName' | 'client' | 'backend' | 'mock'
>;
