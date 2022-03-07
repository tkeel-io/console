const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'tenant',
  publicPath: '/static/console-plugin-tenant-plugins/',
  basePath: '/tenant-plugins',
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-plugins',
      entries: [
        {
          id: 'console-plugin-tenant-plugins',
          name: '插件管理',
          icon: 'PuzzleTwoToneIcon',
          path: '/tenant-plugins',
          entry: '/static/console-plugin-tenant-plugins/',
          portal: 1,
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
