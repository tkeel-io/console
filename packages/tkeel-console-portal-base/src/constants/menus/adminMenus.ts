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
    id: 'console-plugin-admin-tenants',
    name: '租户管理',
    icon: 'GroupTwoToneIcon',
    path: '/admin-tenants',
    entry: 'http://127.0.0.1:3003/static/console-plugin-admin-tenants/',
  },
  {
    id: 'monitoring-alarms',
    name: '监控告警',
    icon: 'AlarmLampTwoToneIcon',
    children: [
      {
        id: 'console-plugin-admin-notification-configs',
        name: '通知方式配置',
        path: '/admin-notification-configs',
        entry:
          'http://127.0.0.1:3017/static/console-plugin-admin-notification-configs/',
      },
    ],
  },
  {
    id: 'devops',
    name: '运维与管理',
    icon: 'MgmtNodeTwoToneIcon',
    children: [
      {
        id: 'console-plugin-admin-usage-statistics',
        name: '用量统计',
        path: '/admin-usage-statistics',
        entry:
          'http://127.0.0.1:3019/static/console-plugin-admin-usage-statistics/',
      },
    ],
  },
];
