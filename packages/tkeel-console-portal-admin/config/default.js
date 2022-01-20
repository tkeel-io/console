const API = {
  protocol: 'http',
  hostname: '192.168.123.11',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  platformName: 'admin',
  publicPath: '/',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: `${API.protocol}:${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
