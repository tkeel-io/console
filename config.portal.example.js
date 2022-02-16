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
  api: API, // development
  // development
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  builder: {
    generateSourcemap: false, // production
  },
  plugin: {
    identify: {
      plugin_id: '',
      dependence: [],
    },
  },
  // local development
  mock: {
    tenantId: '', // portal tenant
    username: '', // portal admin
    password: '', // portal
    menus: [], // portal
  },
};
