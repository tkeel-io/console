import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    categoryId: 'default',
    menus: [
      {
        id: 'plugin-users',
        name: '租户管理',
        icon: 'summary',
        path: '/users',
        entry: 'http://127.0.0.1:3001',
      },
    ],
  },
  {
    categoryId: 'default',
    menus: [
      {
        id: 'plugin-plugins',
        name: '插件管理',
        icon: 'summary',
        path: '/plugins',
        entry: 'http://127.0.0.1:3002',
      },
    ],
  },
];

function fetchMenus(): Promise<IMenu[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MENUS);
    }, 1000);
  });
}

export { MENUS, fetchMenus };
