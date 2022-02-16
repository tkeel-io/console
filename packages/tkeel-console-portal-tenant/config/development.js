const API = {
  origin: 'http://192.168.100.6:30707',
  basePath: '/apis',
};

module.exports = {
  server: {
    port: '3001',
    proxy: {
      [API.basePath]: API.origin,
    },
  },
  api: API,
};
