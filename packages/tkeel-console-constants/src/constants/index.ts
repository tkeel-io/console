export const enum PortalNames {
  ADMIN = 'admin',
  TENANT = 'tenant',
}

export const PORTAL_INFOS = {
  [PortalNames.ADMIN]: {
    name: PortalNames.ADMIN,
  },
  [PortalNames.TENANT]: {
    name: PortalNames.TENANT,
  },
};

export const DEFAULT_PORTAL_NAME = PortalNames.TENANT;

export const DEFAULT_API_BASE_PATH = '/api';

export const DEFAULT_WEBSOCKET_BASE_PATH = '/v1/ws';
