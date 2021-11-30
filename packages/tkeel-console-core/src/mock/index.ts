import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    id: 'plugin-example',
    name: 'plugin-example',
    path: '/plugin-example',
    entry: 'http://127.0.0.1:3001',
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
