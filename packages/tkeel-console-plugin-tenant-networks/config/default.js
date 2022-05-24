module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-networks/',
  client: {
    basePath: '/tenant-networks',
  },
  server: {
    port: '3013',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-networks',
      entries: [
        {
          id: 'console-plugin-tenant-networks',
          name: '网络服务',
          path: '/tenant-networks',
          entry: '/static/console-plugin-tenant-networks/',
          portal: 1,
        },
      ],
      dependence: [],
    },
  },
};
