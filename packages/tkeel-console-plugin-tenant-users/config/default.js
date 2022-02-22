const { tkeel } = require('../../../config/default');

module.exports = {
  publicPath: '/static/console-plugin-tenant-users/',
  basePath: '/tenant-users',
  client: {
    documentTitle: '用户列表',
  },
  api: {
    basePath: '/apis',
  },
  webSocket: {
    basePath: '/v1/ws',
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
              portal: 1,
            },
          ],
        },
      ],
      dependence: [{ id: 'rudder', version: tkeel.version }],
      permissions: {
        id: 'id-0',
        name: 'name-0',
        desc: 'desc-0',
        children: [
          {
            id: 'id-11',
            name: '一一',
            desc: 'desc-11',
            children: [
              {
                id: 'id-222',
                name: 'name-二二二',
                desc: 'desc-222',
              },
              {
                id: 'id-333',
                name: '测试-333',
                desc: 'desc-333',
                children: [
                  {
                    id: 'id-8888',
                    name: 'name-8888',
                    desc: 'desc-8888',
                    children: [],
                  },
                  {
                    id: 'id-7777',
                    name: 'name-9999',
                    desc: 'desc-9999',
                  },
                ],
              },
              {
                id: 'id-444',
                name: 'name-444',
                desc: 'desc-444',
                children: [
                  {
                    id: 'id-5555',
                    name: 'name-5555',
                    desc: 'desc-5555',
                  },
                  {
                    id: 'id-6666',
                    name: 'name-6666',
                    desc: 'desc-6666',
                  },
                  {
                    id: 'id-7777',
                    name: 'name-7777',
                    desc: 'desc-7777',
                  },
                ],
              },
            ],
          },
          {
            id: 'id-aa',
            name: 'name-aa',
            desc: 'desc-aa',
            children: [
              {
                id: 'id-bb',
                name: 'name-bb',
                desc: 'desc-bb',
              },
              {
                id: 'id-cc',
                name: 'name-cc',
                desc: 'desc-cc',
                children: [],
              },
              {
                id: 'id-dd',
                name: 'name-dd',
                desc: 'desc-dd',
                children: [],
              },
            ],
          },
        ],
      },
    },
  },
};
