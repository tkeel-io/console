const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  basePath: '/plugin-example',
  client: {
    documentTitle: '',
  },
  builder: {
    generateSourcemap: false, // production
  },
  server: {
    port: '3099',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
