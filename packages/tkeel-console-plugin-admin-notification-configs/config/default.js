const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-notification-configs/',
  client: {
    basePath: '/admin-notification-configs',
  },
  server: {
    port: '3017',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-notification-configs',
      entries: [
        {
          id: 'monitoring-alarms',
          name: '监控告警',
          icon: 'AlarmLampTwoToneIcon',
          children: [
            {
              id: 'console-plugin-admin-notification-configs',
              name: '通知方式配置',
              path: '/admin-notification-configs',
              entry: '/static/console-plugin-admin-notification-configs/',
              portal: 0,
              disable_manual_activation: true,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-alarm', version: tkeel.version }],
    },
  },
};
