const API = {
  protocol: 'http',
  hostname: '192.168.123.11',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  basePath: '/tenant-devices',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3004',
    proxy: {
      [API.pathname]: `${API.protocol}:${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
