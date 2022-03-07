module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-data-query',
  client: {
    basePath: '/tenant-data-query',
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
