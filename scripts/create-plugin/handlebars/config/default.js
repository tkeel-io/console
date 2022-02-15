const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '30707',
  pathname: '/apis',
};

module.exports = {
  publicPath: '/static/console-plugin-{{name}}',
  basePath: '{{basePath}}',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '{{serverPort}}',
    proxy: {
      [API.pathname]: API.port
        ? `${API.protocol}://${API.hostname}:${API.port}`
        : `${API.protocol}://${API.hostname}`,
    },
  },
  api: API,
  plugin: {
    plugin_id: 'console-plugin-{{name}}',
    entries: [
      {
        id: 'console-plugin-{{name}}',
        name: '',
        icon: '',
        path: '{{basePath}}',
        entry: '/static/console-plugin-{{name}}',
      },
    ],
    dependence: [{ id: '' }],
  },
};
