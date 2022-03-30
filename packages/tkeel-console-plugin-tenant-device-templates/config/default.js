const { tkeel } = require('../../../config/default');
module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-device-templates/',
  client: {
    basePath: '/tenant-device-templates',
  },
  api: {
    basePath: '/apis',
  },
  websocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-device-templates',
      entries: [
        {
          id: 'devices',
          name: '设备管理',
          icon: 'MgmtNodeTwoToneIcon',
          children: [
            {
              key: 'templates',
              id: 'console-plugin-tenant-device-templates',
              name: '设备模板',
              path: '/tenant-device-templates',
              entry: '/static/console-plugin-tenant-device-templates/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-device', version: tkeel.version }],
    },
  },
};
