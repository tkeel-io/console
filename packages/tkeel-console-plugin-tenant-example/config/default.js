module.exports = {
  platformName: 'tenant',
  publicPath: '/static/console-plugin-tenant-example',
  basePath: '/tenant-example',
  client: {
    documentTitle: '',
  },
  server: {
    port: '3099',
  },
  api: {
    basePath: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-example',
      entries: [
        {
          id: 'console-plugin-tenant-example',
          name: '示例插件',
          icon: 'HumanGearTwoToneIcon',
          path: '/tenant-example',
          entry: '/static/console-plugin-tenant-example/',
          portal: 1,
        },
      ],
      dependence: [],
    },
  },
};
