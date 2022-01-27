const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  basePath: '/admin-plugins',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3002',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
