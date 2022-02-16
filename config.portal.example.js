const API = {
  origin: 'http://127.0.0.1:30707', // development
  pathname: '/apis',
};

module.exports = {
  platformName: '', // admin, tenant
  publicPath: '/',
  client: {
    themeName: '',
    documentTitle: '',
  },
  api: API,
  // development
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: API.origin,
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
