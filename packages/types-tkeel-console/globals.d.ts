declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg?svgr' {
  import { FunctionComponent, SVGProps } from 'react';

  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare let __webpack_public_path__: string;

interface Window {
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}

interface GlobalPortalConfig {
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

declare const GLOBAL_PORTAL_CONFIG: GlobalPortalConfig;

declare const GLOBAL_PLUGIN_CONFIG: GlobalPortalConfig;
