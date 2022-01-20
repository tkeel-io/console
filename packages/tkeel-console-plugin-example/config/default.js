const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  basePath: '/example',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '3099',
    proxy: {
      [API.pathname]: `${API.protocol}:${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
