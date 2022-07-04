module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-example/',
  client: {
    basePath: '/example',
  },
  server: {
    port: '3099',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-example',
      entries: [
        {
          id: 'console-plugin-example',
          name: '',
          icon: '',
          path: '/example',
          entry: '/static/console-plugin-example/',
          portal: 1,
          notifications: [],
        },
      ],
      dependence: [],
    },
  },
};
