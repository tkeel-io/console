const { tkeel } = require('../../../config/default');

const API = {
  protocol: 'http',
  hostname: '192.168.123.9',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-tenant-devices/',
  basePath: '/tenant-devices',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3004',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-devices',
      entries: [
        {
          id: 'devices',
          name: '设备管理',
          icon: 'HumanGearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-devices',
              name: '设备管理',
              path: '/tenant-devices',
              entry: '/static/console-plugin-tenant-devices/',
            },
          ],
        },
      ],
      dependence: [{ id: 'device', version: tkeel.version }],
    },
  },
};
