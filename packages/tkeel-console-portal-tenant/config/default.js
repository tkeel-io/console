const { tkeel } = require('../../../config/default');

function getConfigImagePath(path) {
  return `/portal-tenant/config/images/${path}`;
}

module.exports = {
  portalName: 'tenant',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'QingCloud IoT 物联网平台',
    favicon: getConfigImagePath('logo-mark.svg'),
    logoMark: getConfigImagePath('logo-mark.svg'),
    logoTypeLight: getConfigImagePath('logo-type-light.svg'),
    logoTypeDark: getConfigImagePath('logo-type-dark.svg'),
    pages: {
      Login: {
        backgroundImage: getConfigImagePath('background-01.png'),
        title: 'QingCloud IoT 物联网平台',
        subTitle: '颠覆传统物联网应用开发的新一代核心架构',
      },
      SetPassword: {
        backgroundImage: getConfigImagePath('background-02.png'),
        brandName: 'QingCloud IoT',
        title: '物联网平台',
        subTitle: '设置密码',
      },
    },
  },
  api: {
    basePath: '/apis',
  },
  websocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-portal-tenant',
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
