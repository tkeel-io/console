const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-alarms/',
  client: {
    basePath: '/tenant-alarms',
  },
  server: {
    port: '3015',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-alarms',
      entries: [
        {
          id: 'monitoring-alarms',
          name: '监控告警',
          icon: 'AlarmLampTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-alarms',
              name: '告警记录',
              path: '/tenant-alarms',
              entry: '/static/console-plugin-tenant-alarms/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-alarm', version: tkeel.version }],
    },
  },
};
