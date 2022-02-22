const { tkeel } = require('../../../config/default');

module.exports = {
  publicPath: '/static/console-plugin-admin-plugins/',
  basePath: '/admin-plugins',
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
      plugin_id: 'console-plugin-admin-plugins',
      entries: [
        {
          id: 'console-plugin-admin-plugins',
          name: '插件管理',
          icon: 'PuzzleTwoToneIcon',
          path: '/admin-plugins',
          entry: '/static/console-plugin-admin-plugins/',
          portal: 0,
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
