module.exports = {
  publicPath: '/static/console-plugin-tenant-plugins/',
  basePath: '/tenant-plugins',
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
      plugin_id: 'console-plugin-tenant-plugins',
      entries: [],
      dependence: [],
    },
  },
};
