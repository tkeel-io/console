const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-data-query/',
  client: {
    basePath: '/tenant-data-query',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-data-query',
      entries: [
        {
          id: 'tenant-data-use',
          name: '数据使用',
          icon: 'TopologyCircleTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-data-query',
              name: '数据查询',
              path: '/tenant-data-query',
              entry: '/static/console-plugin-tenant-data-query/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [
        { id: 'core-broker', version: tkeel.version },
        { id: 'tkeel-device', version: tkeel.version },
      ],
    },
  },
};
