const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-service-monitoring/',
  client: {
    basePath: '/admin-service-monitoring',
  },
  server: {
    port: '3014',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-service-monitoring',
      disable_manual_activation: true,
      entries: [
        {
          id: 'devops',
          name: '运维与管理',
          icon: 'MgmtNodeTwoToneIcon',
          children: [
            {
              id: 'console-plugin-admin-service-monitoring',
              name: '服务监控',
              path: '/admin-service-monitoring',
              entry: '/static/console-plugin-admin-service-monitoring/',
              portal: 0,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-monitor', version: tkeel.version }],
    },
  },
};
