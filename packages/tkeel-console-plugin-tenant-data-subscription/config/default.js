module.exports = {
  platformName: 'tenant',
  publicPath: '/static/console-plugin-tenant-data-subscription/',
  basePath: '/tenant-data-subscription',
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
      plugin_id: 'console-plugin-tenant-data-subscription',
      entries: [],
      dependence: [],
    },
  },
};
