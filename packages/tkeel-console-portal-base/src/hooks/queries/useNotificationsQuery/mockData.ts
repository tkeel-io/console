export default [
  {
    entry: {
      id: 'console-plugin-tenant-alarm-policy',
      name: '告警策略',
      children: null,
      notifications: [
        {
          api_path: '/apis/tkeel-alarm/v1/notifications',
        },
      ],
    },
    notification: {
      action: {
        extras: {
          is_open_in_new_window: false,
        },
        type: 'internal-jump',
        value: '/tenant-alarm-policy',
      },
      content: '告警策略「测试规则-6-24」使用的设备发生变更',
      create_timestamp: 1_657_606_765_022,
      id: '79ac55bb-4563-4890-be00-a85d724f63b1',
      title: '监控告警插件通知',
    },
  },
  {
    entry: {
      id: 'console-plugin-tenant-alarm-policy',
      name: '告警策略',
      children: null,
      notifications: [
        {
          api_path: '/apis/tkeel-alarm/v1/notifications',
        },
      ],
    },
    notification: {
      action: {
        extras: {
          is_open_in_new_window: false,
        },
        type: 'internal-jump',
        value: '/tenant-alarm-policy',
      },
      content: '告警策略「kkl」使用的遥测属性发生变更',
      create_timestamp: 1_657_606_765_022,
      id: '71c75af8-e1aa-453d-9d12-e5a7a631b481',
      title: '监控告警插件通知',
    },
  },
];
