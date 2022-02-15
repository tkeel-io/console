const API = {
  protocol: 'http',
  hostname: '192.168.100.9',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-tenant-data-subscription/',
  basePath: '/tenant-data-subscription',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '3008',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
};
