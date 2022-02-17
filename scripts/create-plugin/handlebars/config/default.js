module.exports = {
  publicPath: '/static/console-plugin-{{name}}',
  basePath: '{{basePath}}',
  client: {
    documentTitle: 'tKeel',
  },
  server: {
    port: '{{serverPort}}',
  },
  api: {
    basePath: '/apis',
  },
  plugin: {
    identify: {
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
      dependence: [],
    },
  },
};
