const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-routing-rules/',
  client: {
    basePath: '/tenant-routing-rules',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-routing-rules',
      entries: [
        {
          id: 'tenant-data-use',
          name: '数据使用',
          icon: 'TopologyCircleTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-routing-rules',
              name: '数据路由',
              path: '/tenant-routing-rules',
              entry: '/static/console-plugin-tenant-routing-rules/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [
        { id: 'core-broker', version: tkeel.version },
        { id: 'rule-manager', version: tkeel.version },
      ],
    },
  },
};
