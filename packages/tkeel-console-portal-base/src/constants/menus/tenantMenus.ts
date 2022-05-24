export default [
  {
    id: 'plugins',
    name: '插件管理',
    icon: 'PuzzleTwoToneIcon',
    path: '/tenant-plugins',
    entry: 'http://127.0.0.1:3009/static/console-plugin-tenant-plugins/',
  },
  {
    id: 'tenant-data-use',
    name: '数据使用',
    icon: 'TopologyCircleTwoToneIcon',
    children: [
      {
        id: 'console-plugin-tenant-routing-rules',
        name: '数据路由',
        path: '/tenant-routing-rules',
        entry:
          'http://127.0.0.1:3011/static/console-plugin-tenant-routing-rules/',
      },
      {
        id: 'console-plugin-tenant-data-query',
        name: '数据查询',
        path: '/tenant-data-query',
        entry: 'http://127.0.0.1:3010/static/console-plugin-tenant-data-query/',
      },
      {
        id: 'console-plugin-tenant-data-subscription',
        name: '数据订阅',
        path: '/tenant-data-subscription',
        entry:
          'http://127.0.0.1:3008/static/console-plugin-tenant-data-subscription/',
      },
    ],
  },
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
        entry: 'http://127.0.0.1:3004/static/console-plugin-tenant-devices/',
      },
      {
        key: 'templates',
        id: 'console-plugin-tenant-device-templates',
        name: '设备模板',
        path: '/tenant-device-templates',
        entry:
          'http://127.0.0.1:3007/static/console-plugin-tenant-device-templates/',
      },
      {
        id: 'console-plugin-tenant-networks',
        name: '网络服务',
        path: '/tenant-networks',
        entry: 'http://127.0.0.1:3013/static/console-plugin-tenant-networks/',
      },
    ],
  },
  {
    id: 'users',
    name: '用户管理',
    icon: 'HumanGearTwoToneIcon',
    children: [
      {
        id: 'console-plugin-tenant-users',
        name: '用户列表',
        path: '/tenant-users',
        entry: 'http://127.0.0.1:3005/static/console-plugin-tenant-users/',
      },
      {
        id: 'console-plugin-tenant-roles',
        name: '角色管理',
        path: '/tenant-roles',
        entry: 'http://127.0.0.1:3006/static/console-plugin-tenant-roles/',
      },
    ],
  },
];
