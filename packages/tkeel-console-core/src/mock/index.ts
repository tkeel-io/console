import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    id: 'plugin-example',
    name: 'plugin-example',
    path: '/example',
    entry: 'http://127.0.0.1:3001',
  },
  /* {
    id: 'plugin-vue-example',
    name: 'plugin-vue-example',
    path: '/plugin-vue-example',
    entry: 'http://127.0.0.1:3002',
  }, */
];

function fetchMenus(): Promise<IMenu[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MENUS);
    }, 1000);
  });
}

export { MENUS, fetchMenus };
