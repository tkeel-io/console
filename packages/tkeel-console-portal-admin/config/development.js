const API = {
  origin: 'http://192.168.100.6:30707',
  basePath: '/apis',
};

const WebSocket = {
  origin: 'ws://192.168.123.9:32390',
  basePath: '/v1/ws',
};

module.exports = {
  server: {
    port: '3000',
    proxy: {
      [API.basePath]: API.origin,
    },
  },
  api: API,
  webSocket: WebSocket,
};
