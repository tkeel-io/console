const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/',
  basePath: '/plugin-example',
  client: {
    documentTitle: '',
  },
  builder: {
    generateSourcemap: false, // production
  },
  server: {
    port: '3099',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    plugin_id: 'console-plugin-example',
    entries: [
      {
        id: '',
        name: '',
        icon: '',
        children: [
          {
            id: '',
            name: '',
          },
        ],
      },
    ],
    dependence: [{ id: '' }],
  },
};
