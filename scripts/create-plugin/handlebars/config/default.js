module.exports = {
  portalName: '{{portalName}}',
  publicPath: '/static/console-plugin-{{name}}/',
  client: {
    basePath: '{{basePath}}',
  },
  server: {
    port: '{{serverPort}}',
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
          entry: '/static/console-plugin-{{name}}/',
          portal: {{portalValue}},
          notifications: [],
        },
      ],
      dependence: [],
    },
  },
};
