const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-notification-objects/',
  client: {
    basePath: '/tenant-notification-objects',
  },
  server: {
    port: '3018',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-notification-objects',
      entries: [
        {
          id: 'monitoring-alarms',
          name: '监控告警',
          icon: 'MgmtNodeTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-notification-objects',
              name: '通知对象配置',
              path: '/tenant-notification-objects',
              entry: '/static/console-plugin-tenant-notification-objects/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-alarm', version: tkeel.version }],
    },
  },
};
