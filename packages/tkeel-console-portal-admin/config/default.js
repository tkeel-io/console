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
    subTitle1: '构建和管理物联网解决方案的数字平台',
    subTitle2: '100% Cloud Native, Any language, Everything is plugin, Simply',
    favicon: getConfigImagePath('logo-mark.svg'),
    logoMark: getConfigImagePath('logo-mark.svg'),
    logoTypeLight: getConfigImagePath('logo-type-light.svg'),
    logoTypeDark: getConfigImagePath('logo-type-dark.svg'),
    pages: {
      Login: {
        backgroundImage: getConfigImagePath('background-01.png'),
        title: 'QingCloud IoT 物联网',
        additionalTitle: '运维管理平台',
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
      disable_manual_activation: true,
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
