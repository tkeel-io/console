module.exports = {
  publicPath: '/static/console-plugin-tenant-device-template/',
  basePath: '/tenant-device-template',
  client: {
    documentTitle: 'tKeel',
  },
  api: {
    basePath: '/apis',
  },
  webSocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-device-template',
      entries: [],
      dependence: [],
    },
  },
};
