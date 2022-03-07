const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-tenants/',
  basePath: '/admin-tenants',
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-tenants',
      disable_manual_activation: true,
      entries: [
        {
          id: 'console-plugin-admin-tenants',
          name: '租户管理',
          icon: 'GroupTwoToneIcon',
          path: '/admin-tenants',
          entry: '/static/console-plugin-admin-tenants/',
          portal: 0,
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
