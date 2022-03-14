module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-routing-rules/',
  client: {
    basePath: '/tenant-routing-rules',
  },
  server: {
    port: '3011',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-routing-rules',
      entries: [
        {
          id: 'console-plugin-tenant-routing-rules',
          name: '',
          icon: '',
          path: '/tenant-routing-rules',
          entry: '/static/console-plugin-tenant-routing-rules/',
          portal: 1,
        },
      ],
      dependence: [],
    },
  },
};
