module.exports = {
  publicPath: '/static/console-plugin-tenant-plugins/',
  basePath: '/tenant-plugins',
  client: {
    documentTitle: 'tKeel',
  },
  api: {
    pathname: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-plugins',
      entries: [],
      dependence: [],
    },
  },
};
