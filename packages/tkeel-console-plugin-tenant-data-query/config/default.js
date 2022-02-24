module.exports = {
  platformName: 'tenant',
  publicPath: '/static/console-plugin-tenant-data-query',
  basePath: '/tenant-data-query',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3010',
  },
  api: {
    basePath: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-data-query',
      entries: [
        {
          id: 'console-plugin-tenant-data-query',
          name: '',
          icon: '',
          path: '/tenant-data-query',
          entry: '/static/console-plugin-tenant-data-query',
          portal: 1,
        },
      ],
      dependence: [],
    },
  },
};
