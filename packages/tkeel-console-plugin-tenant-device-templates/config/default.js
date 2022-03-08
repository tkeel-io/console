module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-device-templates/',
  basePath: '/tenant-device-templates',
  client: {
    documentTitle: '',
  },
  api: {
    basePath: '/apis',
  },
  websocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-device-templates',
      entries: [],
      dependence: [],
    },
  },
};
