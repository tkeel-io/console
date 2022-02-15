const API = {
  protocol: 'http',
  hostname: '192.168.123.9',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  platformName: 'tenant',
  publicPath: '/',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '3001',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
