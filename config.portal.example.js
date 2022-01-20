const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  platformName: '', // admin, tenant
  publicPath: '/',
  client: {
    documentTitle: '',
  },
  builder: {
    generateSourcemap: false, // production
  },
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
  // local development
  mock: {
    username: '', // portal admin
    password: '', // portal
    mockMenus: [], // portal
  },
};
