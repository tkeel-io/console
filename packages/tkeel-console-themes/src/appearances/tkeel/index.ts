import type { Appearance } from '../types';
import logoMark from './assets/images/logo-mark.svg';
import logoTypeAdminDark from './assets/images/logo-type-admin-dark.svg';
import logoTypeAdminLight from './assets/images/logo-type-admin-light.svg';
import logoTypeTenantDark from './assets/images/logo-type-tenant-dark.svg';
import logoTypeTenantLight from './assets/images/logo-type-tenant-light.svg';
import background from './assets/images/tkeel-background.webp';

const APPEARANCE: Appearance = {
  common: {
    slogan: '构建和管理物联网解决方案的数字平台', // 100% Cloud Native, Any language, Everything is plugin, Simply
    logoMark,
    backgroundImage: background,
    backgroundImageLogo: 'logoTypeLight',
  },
  platform: {
    admin: {
      platformName: 'tKeel 管理运维平台',
      logoTypeLight: logoTypeAdminLight,
      logoTypeDark: logoTypeAdminDark,
    },
    tenant: {
      platformName: 'tKeel 物联网平台',
      logoTypeLight: logoTypeTenantLight,
      logoTypeDark: logoTypeTenantDark,
    },
  },
};

export default APPEARANCE;
