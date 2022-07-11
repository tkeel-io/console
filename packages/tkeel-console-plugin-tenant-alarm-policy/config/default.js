const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-alarm-policy/',
  client: {
    basePath: '/tenant-alarm-policy',
  },
  server: {
    port: '3016',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-alarm-policy',
      entries: [
        {
          id: 'monitoring-alarms',
          name: '监控告警',
          icon: 'AlarmLampTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-alarm-policy',
              name: '告警策略',
              path: '/tenant-alarm-policy',
              entry: '/static/console-plugin-tenant-alarm-policy/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-alarm', version: tkeel.version }],
    },
  },
};
