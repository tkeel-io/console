const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/plugins/{{name}}',
  basePath: '{{basePath}}',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '{{serverPort}}',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
