const { tkeel } = require('../../../config/default');

const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-admin-plugins/',
  basePath: '/admin-plugins',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3002',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-plugins',
      entries: [
        {
          id: 'console-plugin-admin-plugins',
          name: '插件管理',
          icon: 'PuzzleTwoToneIcon',
          path: '/admin-plugins',
          entry: '/static/console-plugin-admin-tenants/',
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
