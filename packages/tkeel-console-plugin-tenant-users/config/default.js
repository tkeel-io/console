const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/plugins/tenant-users/',
  basePath: '/tenant-users',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3005',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
