const { tkeel } = require('../../../config/default');

function getConfigImagePath(path) {
  return `/portal-admin/config/images/${path}`;
}

module.exports = {
  portalName: 'admin',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'QingCloud IoT 物联网运维管理平台',
    favicon: getConfigImagePath('logo-mark.svg'),
    logoMark: getConfigImagePath('logo-mark.svg'),
    logoTypeLight: getConfigImagePath('logo-type-light.svg'),
    logoTypeDark: getConfigImagePath('logo-type-dark.svg'),
    pages: {
      login: {
        backgroundImage: getConfigImagePath('background-01.png'),
        title: 'QingCloud IoT 物联网',
        titlePart2: '运维管理平台',
        subTitle: '颠覆传统物联网应用开发的新一代核心架构',
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
      plugin_id: 'console-portal-admin',
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
