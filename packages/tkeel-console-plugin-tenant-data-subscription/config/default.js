const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-data-subscription/',
  basePath: '/tenant-data-subscription',
  client: {
    documentTitle: '',
  },
  api: {
    basePath: '/apis',
  },
  webSocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-data-subscription',
      entries: [
        {
          id: 'tenant-data-use',
          name: '数据使用',
          icon: 'TopologyCircleTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-data-subscription',
              name: '数据订阅',
              path: '/tenant-data-subscription',
              entry: '/static/console-plugin-tenant-data-subscription/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'core-broker', version: tkeel.version }],
    },
  },
};
