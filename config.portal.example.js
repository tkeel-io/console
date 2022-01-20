const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  documentTitle: '',
  server: {
    port: 3000,
    proxy: {
      [API.pathname]: `${API.protocol}:${API.hostname}:${API.port}`,
    },
  },
  api: API,
  client: {
    username: '', // portal admin, local development
    password: '', // portal, local development
    mockMenus: '', // portal, local development
  },
  builder: {
    generateSourcemap: false, // production
  },
};
