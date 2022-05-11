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
          name: '',
          icon: '',
          path: '/admin-service-monitoring',
          entry: '/static/console-plugin-admin-service-monitoring/',
          portal: 0,
        },
      ],
      dependence: [],
    },
  },
};
