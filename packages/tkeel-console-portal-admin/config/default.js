const { tkeel } = require('../../../config/default');

module.exports = {
  platformName: 'admin',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'tKeel 管理平台',
  },
  api: {
    basePath: '/apis',
  },
  webSocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-portal-admin',
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
