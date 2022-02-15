const { tkeel } = require('../../../config/default');

const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-tenant-users/',
  basePath: '/tenant-users',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3005',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-users',
      entries: [
        {
          id: 'users',
          name: '用户管理',
          icon: 'HumanGearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-users',
              name: '用户列表',
              path: '/tenant-users',
              entry: '/static/console-plugin-tenant-users/',
            },
          ],
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
