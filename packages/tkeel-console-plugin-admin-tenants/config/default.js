const { tkeel } = require('../../../config/default');

module.exports = {
  publicPath: '/static/console-plugin-admin-tenants/',
  basePath: '/admin-tenants',
  client: {
    documentTitle: '',
  },
  api: {
    pathname: '/apis',
  },
  plugin: {
    identify: {
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
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
