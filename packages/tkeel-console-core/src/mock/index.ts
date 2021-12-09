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
  /* {
    categoryId: 'dataOrganization',
    categoryName: '数据组织',
    menus: [
      {
        id: 'plugin-vue-example',
        name: '设备管理',
        icon: 'house',
        path: '/plugin-vue-example',
        entry: 'http://127.0.0.1:3002',
      },
    ],
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
