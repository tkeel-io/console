import background01 from '../assets/images/background-01.png';
import background02 from '../assets/images/background-02.png';
import logoMark from '../assets/images/logo-mark.svg';
import logoSetPassword from '../assets/images/logo-set-password.svg';
import logoTypeAdminDark from '../assets/images/logo-type-admin-dark.svg';
import logoTypeAdminLight from '../assets/images/logo-type-admin-light.svg';
import logoTypeTenantDark from '../assets/images/logo-type-tenant-dark.svg';
import logoTypeTenantLight from '../assets/images/logo-type-tenant-light.svg';

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

export const DEFAULT_PORTAL_ADMIN_CONFIG = {
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'QingCloud IoT 物联网运维管理平台',
    subTitle1: '构建和管理物联网解决方案的数字平台',
    subTitle2: '100% Cloud Native, Any language, Everything is plugin, Simply',
    favicon: logoMark,
    logoMark,
    logoTypeLight: logoTypeAdminLight,
    logoTypeDark: logoTypeAdminDark,
    pages: {
      Login: {
        backgroundImage: background01,
        title: 'QingCloud IoT 物联网',
        additionalTitle: '运维管理平台',
      },
    },
  },
};

export const DEFAULT_PORTAL_TENANT_CONFIG = {
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'QingCloud IoT 物联网平台',
    subTitle1: '构建和管理物联网解决方案的数字平台',
    subTitle2: '100% Cloud Native, Any language, Everything is plugin, Simply',
    favicon: logoMark,
    logoMark,
    logoTypeLight: logoTypeTenantLight,
    logoTypeDark: logoTypeTenantDark,
    pages: {
      Login: {
        backgroundImage: background01,
        title: 'QingCloud IoT 物联网平台',
      },
      SetPassword: {
        backgroundImage: background02,
        logo: logoSetPassword,
      },
    },
  },
};
