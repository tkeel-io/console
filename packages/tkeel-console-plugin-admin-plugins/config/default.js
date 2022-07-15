const { tkeel } = require('../../../config/default');

module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-plugins/',
  client: {
    basePath: '/admin-plugins',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-plugins',
      disable_manual_activation: true,
      entries: [
        {
          id: 'console-plugin-admin-plugins',
          name: '插件管理',
          icon: 'PuzzleTwoToneIcon',
          path: '/admin-plugins',
          entry: '/static/console-plugin-admin-plugins/',
          portal: 0,
          disable_manual_activation: true,
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
