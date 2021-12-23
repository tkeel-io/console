/* eslint-disable import/prefer-default-export */
// import { request } from '@tkeel/console-utils';

import { IMenu } from './types';

function fetchMenus(): Promise<IMenu[]> {
  return new Promise<IMenu[]>((resolve) => {
    const menus: IMenu[] = [
      {
        id: 'plugin-plugins',
        name: '插件管理',
        icon: 'AppsAddFilledIcon',
        path: '/plugins',
        entry: 'http://127.0.0.1:3001/plugins',
      },
      {
        id: 'plugin-users',
        name: '用户管理',
        icon: 'HumanVipFilledIcon',
        path: '/users',
        entry: 'http://127.0.0.1:3002/users',
      },
    ];
    resolve(menus);
  });
}

// async function fetchMenus(): Promise<IMenu[]> {
//   const { data } = await request<IData>({
//     url: '/rudder/v1/entries',
//   });

//   return data.entries.map((entry) => ({
//     ...entry,
//     icon: 'AppsAddFilledIcon',
//   }));
// }

export { fetchMenus };
