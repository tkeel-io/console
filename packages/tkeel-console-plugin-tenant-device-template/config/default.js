const API = {
  protocol: 'http',
  hostname: '192.168.100.6',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/plugins/tenant-device-template/',
  basePath: '/tenant-device-template',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '3007',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
