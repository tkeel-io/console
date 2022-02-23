const { tkeel } = require('../../../config/default');

module.exports = {
  platformName: 'tenant',
  publicPath: '/static/console-plugin-tenant-devices/',
  basePath: '/tenant-devices',
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
      plugin_id: 'console-plugin-tenant-devices',
      entries: [
        {
          id: 'devices',
          name: '设备管理',
          icon: 'HumanGearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-devices',
              name: '设备管理',
              path: '/tenant-devices',
              entry: '/static/console-plugin-tenant-devices/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'device', version: tkeel.version }],
    },
  },
};
