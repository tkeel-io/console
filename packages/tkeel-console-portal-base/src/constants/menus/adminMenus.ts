export default [
  {
    id: 'console-plugin-admin-plugins',
    name: '插件管理',
    icon: 'PuzzleTwoToneIcon',
    path: '/admin-plugins',
    entry: 'http://127.0.0.1:3002/static/console-plugin-admin-plugins/',
  },
  {
    id: 'platform-config',
    name: '平台配置',
    icon: 'GearTwoToneIcon',
    children: [
      {
        id: 'console-plugin-admin-custom-config',
        name: '定制化配置',
        path: '/admin-custom-config',
        entry:
          'http://127.0.0.1:3012/static/console-plugin-admin-custom-config/',
      },
    ],
  },
  {
    id: 'console-plugin-admin-tenants1',
    name: '租户管理',
    icon: 'GroupTwoToneIcon',
    children: [
      {
        id: 'console-plugin-admin-tenants',
        name: '租户管理',
        path: '/admin-tenants',
        entry: 'http://127.0.0.1:3003/static/console-plugin-admin-tenants/',
      },
    ],
  },
];
