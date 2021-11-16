import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    id: 'app-01',
    name: 'react-app',
    path: '/react-app',
    entry: 'http://127.0.0.1:3001',
  },
  {
    id: 'app-02',
    name: 'vue-app',
    path: '/vue-app',
    entry: 'http://127.0.0.1:3002',
  },
  {
    id: 'app-03',
    name: 'html-app',
    path: '/html-app',
    entry: 'http://127.0.0.1:3003',
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
