const API = {
  protocol: 'http',
  hostname: '192.168.123.9',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/tenant-devices/',
  basePath: '/tenant-devices',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3004',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
};
