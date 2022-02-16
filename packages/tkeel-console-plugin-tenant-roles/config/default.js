const { tkeel } = require('../../../config/default');

module.exports = {
  publicPath: '/static/console-plugin-tenant-roles/',
  basePath: '/tenant-roles',
  client: {
    documentTitle: '',
  },
  api: {
    pathname: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-tenant-roles',
      entries: [
        {
          id: 'users',
          name: '用户管理',
          icon: 'HumanGearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-tenant-roles',
              name: '角色管理',
              path: '/tenant-roles',
              entry: '/static/console-plugin-tenant-roles/',
            },
          ],
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
