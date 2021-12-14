import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    categoryId: 'default',
    menus: [
      {
        id: 'plugin-example',
        name: 'example',
        icon: 'summary',
        path: '/example',
        entry: 'http://127.0.0.1:3001',
      },
    ],
  },
  {
    categoryId: 'default',
    menus: [
      {
        id: 'plugin-plugins',
        name: 'plugins',
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
