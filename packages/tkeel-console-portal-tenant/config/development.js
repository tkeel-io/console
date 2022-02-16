const API = {
  origin: 'http://192.168.100.6:30707',
  pathname: '/apis',
};

module.exports = {
  server: {
    port: '3001',
    proxy: {
      [API.pathname]: API.origin,
    },
  },
  api: API,
};
