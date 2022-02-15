const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-tenant-plugins/',
  basePath: '/tenant-plugins',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '3009',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-plugins',
      entries: [],
      dependence: [],
    },
  },
};
