const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-tenant-users/',
  basePath: '/tenant-roles',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3006',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    plugin_id: 'console-plugin-tenant-roles',
    entries: [
      {
        id: 'users',
        name: '用户管理',
        icon: 'HumanGearTwoToneIcon',
        children: [
          {
            id: 'console-plugin-tenant-roles',
            name: '角色管理',
          },
        ],
      },
    ],
    dependence: [{ id: '' }],
  },
};
