const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
    documentTitle: '',
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
