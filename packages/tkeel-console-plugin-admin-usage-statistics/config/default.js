const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-usage-statistics/',
  client: {
    basePath: '/admin-usage-statistics',
  },
  server: {
    port: '3019',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-usage-statistics',
      disable_manual_activation: true,
      entries: [
        {
          id: 'devops',
          name: '运维与管理',
          icon: 'MgmtNodeTwoToneIcon',
          children: [
            {
              id: 'console-plugin-admin-usage-statistics',
              name: '用量统计',
              path: '/admin-usage-statistics',
              entry: '/static/console-plugin-admin-usage-statistics/',
              portal: 0,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-monitor', version: tkeel.version }],
    },
  },
};
