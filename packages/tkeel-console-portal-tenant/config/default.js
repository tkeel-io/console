const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/',
  client: {
    brand: 'tkeel', // qingcloud
    themeName: 'qingcloud-light',
  },
  backend: {
    api: {
      basePath: '/apis',
    },
    websocket: {
      basePath: '/v1/ws',
    },
  },
  plugin: {
    identify: {
      plugin_id: 'console-portal-tenant',
      disable_manual_activation: true,
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
