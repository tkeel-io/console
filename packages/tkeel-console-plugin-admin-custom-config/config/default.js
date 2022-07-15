module.exports = {
  portalName: 'admin',
  publicPath: '/static/console-plugin-admin-custom-config/',
  client: {
    basePath: '/admin-custom-config',
  },
  server: {
    port: '3012',
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-admin-custom-config',
      entries: [
        {
          id: 'platform-config',
          name: '平台配置',
          icon: 'GearTwoToneIcon',
          children: [
            {
              id: 'console-plugin-admin-custom-config',
              name: '定制化配置',
              path: '/admin-custom-config',
              entry: '/static/console-plugin-admin-custom-config/',
              portal: 0,
              disable_manual_activation: true,
            },
          ],
        },
      ],
      dependence: [],
    },
  },
};
