/* eslint-disable import/prefer-default-export */
// import { IEntry, IEntryData, IMenu, IMenuDetail } from './types';
import { IMenu } from './types';

const MENUS: IMenu[] = [
  {
    categoryId: 'default',
    menus: [
      {
        id: 'plugin-plugins',
        name: '插件管理',
        icon: 'summary',
        path: '/plugins',
        entry: 'http://127.0.0.1:3001',
      },
      {
        id: 'plugin-users',
        name: '租户管理',
        icon: 'summary',
        path: '/users',
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

// function entriesToMenus(entries: IEntry[]): IMenu[] {
//   const menus: IMenuDetail[] = [];
//   entries.forEach((entryItem) => {
//     const { id, name, icon, path, entry, menu } = entryItem;
//     const { length } = menu;
//     if (length === 2) {
//       const newEntry: IMenuDetail | undefined = menus.find(
//         (item) => item.name === menu[0]
//       );
//       if (newEntry) {
//         (newEntry.children as IMenuDetail[]).push(entryItem);
//       } else {
//         menus.push({
//           id: menu[0],
//           name: menu[0],
//           icon,
//           children: [
//             {
//               id,
//               name,
//               icon,
//               path,
//               entry,
//             },
//           ],
//         });
//       }
//     } else {
//       menus.push(entryItem);
//     }
//   });

//   const menuInfo: IMenu[] = [
//     {
//       categoryId: 'default',
//       menus,
//     },
//   ];
//   return menuInfo;
// }

// function fetchMenus(): Promise<IMenu[]> {
//   return fetch('/apis/rudder/v1/entries')
//     .then((response) => response.json())
//     .then((data: IEntryData) => {
//       const entries: IEntry[] = data.entries.map((item) => {
//         return {
//           ...item,
//           icon: 'summary',
//           entry: `http://127.0.0.1:${
//             item.path === '/plugins' ? '3001' : '3002'
//           }`,
//         };
//       });
//       return entriesToMenus(entries);
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.log('error', error);
//       return MENUS;
//     });
// }

export { fetchMenus };
