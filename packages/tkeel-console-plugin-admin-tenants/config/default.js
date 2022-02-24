const { tkeel } = require('../../../config/default');

module.exports = {
  platformName: 'admin',
  publicPath: '/static/console-plugin-admin-tenants/',
  basePath: '/admin-tenants',
  client: {
    documentTitle: '租户管理',
  },
  api: {
    basePath: '/apis',
  },
  webSocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-tenants',
      entries: [
        {
          id: 'console-plugin-admin-tenants',
          name: '租户管理',
          icon: 'PersonGroupTwoToneIcon',
          path: '/admin-tenants',
          entry: '/static/console-plugin-admin-tenants/',
          portal: 0,
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
