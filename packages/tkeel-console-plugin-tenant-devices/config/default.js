const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-devices/',
  basePath: '/tenant-devices',
  client: {
    documentTitle: '',
  },
  api: {
    basePath: '/apis',
  },
  websocket: {
    basePath: '/v1/ws',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-devices',
      entries: [
        {
          id: 'devices',
          name: '设备管理',
          icon: 'MgmtNodeTwoToneIcon',
          children: [
            {
              key: 'devices',
              id: 'console-plugin-tenant-devices',
              name: '设备列表',
              path: '/tenant-devices',
              entry: '/static/console-plugin-tenant-devices/',
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'tkeel-device', version: tkeel.version }],
    },
  },
};
