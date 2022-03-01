interface PortalGlobals {
  edition: 'free' | 'paid';
  portalName: 'admin' | 'tenant';
  publicPath: string;
  client: {
    themeName: 'tkeel-light' | 'qingcloud-light';
    documentTitle: string | number;
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
    tenantId?: string | number; // tenant
    username?: string | number; // tenant
    password?: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menus?: Array<Record<string, any>>;
  };
}

declare const PORTAL_GLOBALS: PortalGlobals;
