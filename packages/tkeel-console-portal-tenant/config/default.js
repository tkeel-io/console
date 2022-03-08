const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
  },
  backend: {
    api: {
      origin: 'http://192.168.123.9:30707',
      basePath: '/apis',
    },
    websocket: {
      origin: 'ws://192.168.123.9:32390',
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
