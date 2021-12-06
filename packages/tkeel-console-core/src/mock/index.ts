import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    categoryId: 'default',
    subMenus: [
      {
        id: 'plugin-example',
        name: 'plugin-example',
        path: '/plugin-example',
        entry: 'http://127.0.0.1:3001',
      },
    ],
  },
  {
    categoryId: 'dataOrganization',
    categoryName: '数据组织',
    subMenus: [
      {
        id: 'plugin-vue-example',
        name: 'plugin-vue-example',
        path: '/plugin-vue-example',
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
