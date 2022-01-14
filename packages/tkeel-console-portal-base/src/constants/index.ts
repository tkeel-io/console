export const enum PlatformNames {
  ADMIN = 'admin',
  TENANT = 'tenant',
}

export const PLATFORM_INFOS = {
  [PlatformNames.ADMIN]: {
    name: PlatformNames.ADMIN,
    validateAuthApi: '/rudder/v1/oauth2/authorize',
  },
  [PlatformNames.TENANT]: {
    name: PlatformNames.TENANT,
    validateAuthApi: '/security/v1/oauth/authenticate',
  },
};
