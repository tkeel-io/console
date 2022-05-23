const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-service-monitoring/',
  client: {
    basePath: '/admin-service-monitoring',
  },
  server: {
    port: '3013',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-service-monitoring',
      entries: [
        {
          id: 'console-plugin-admin-service-monitoring',
          name: '服务监控',
          icon: 'MonitorTwoToneIcon',
          path: '/admin-service-monitoring',
          entry: '/static/console-plugin-admin-service-monitoring/',
          portal: 0,
        },
      ],
      dependence: [{ id: 'tkeel-monitor', version: tkeel.version }],
    },
  },
};
