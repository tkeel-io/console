const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-admin-tenants/',
  basePath: '/admin-tenants',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3003',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    plugin_id: 'console-plugin-admin-tenants',
    entries: [
      {
        id: 'console-plugin-admin-tenants',
        name: '租户管理',
        icon: 'HumanGearTwoToneIcon',
        path: '/admin-tenants',
        entry: '/static/console-plugin-admin-tenants/',
      },
    ],
    dependence: [{ id: '' }],
  },
};
