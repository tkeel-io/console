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
    themeName: '',
    documentTitle: '',
  },
  builder: {
    generateSourcemap: false, // production
  },
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    identify: {
      plugin_id: '',
      dependence: [],
    },
  },
  // local development
  mock: {
    username: '', // portal admin
    password: '', // portal
    menus: [], // portal
  },
};
