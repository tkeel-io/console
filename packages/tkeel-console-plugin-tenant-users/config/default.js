const { tkeel } = require('../../../config/default');

module.exports = {
  publicPath: '/static/console-plugin-tenant-users/',
  basePath: '/tenant-users',
  client: {
    documentTitle: '',
  },
  api: {
    basePath: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-users',
      entries: [
        {
          id: 'users',
          name: '用户管理',
          icon: 'HumanGearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-users',
              name: '用户列表',
              path: '/tenant-users',
              entry: '/static/console-plugin-tenant-users/',
            },
          ],
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
