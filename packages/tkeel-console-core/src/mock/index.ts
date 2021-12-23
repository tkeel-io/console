/* eslint-disable import/prefer-default-export */
import { IEntry, IMenu, IMenuDetail } from './types';

// const MENUS: IMenu[] = [
//   {
//     category: '',
//     menus: [
//       {
//         id: 'plugin-plugins',
//         name: '插件管理',
//         icon: 'summary',
//         path: '/plugins',
//         entry: 'http://127.0.0.1:3001',
//       },
//       {
//         id: 'plugin-users',
//         name: '租户管理',
//         icon: 'summary',
//         path: '/users',
//         entry: 'http://127.0.0.1:3002',
//       },
//     ],
//   },
// ];

function entriesToMenus(entries: IEntry[]) {
  const menus: IMenuDetail[] = [];
  entries.forEach((entryItem) => {
    const { id, name, icon, path, entry, menu } = entryItem;
    const { length } = menu;
    if (length === 2) {
      const newEntry: IMenuDetail | undefined = menus.find(
        (item) => item.name === menu[0]
      );
      if (newEntry) {
        (newEntry.children as IMenuDetail[]).push(entryItem);
      } else {
        menus.push({
          id: menu[0],
          name: menu[0],
          icon,
          children: [
            {
              id,
              name,
              icon,
              path,
              entry,
            },
          ],
        });
      }
    } else {
      menus.push(entryItem);
    }
  });

  return menus;
}

function entriesToMenuInfo(entries: IEntry[]): IMenu[] {
  const categoryList: string[] = [];
  entries.forEach(({ category }) => {
    if (!categoryList.includes(category)) {
      categoryList.push(category);
    }
  });

  const menuInfo: IMenu[] = categoryList.map((category) => {
    const categoryEntries = entries.filter(
      (entry) => entry.category === category
    );
    return {
      category,
      menus: entriesToMenus(categoryEntries),
    };
  });
  return menuInfo;
}

function fetchMenus(): Promise<IMenu[]> {
  return new Promise<IMenu[]>((resolve) => {
    const entries: IEntry[] = [
      {
        id: 'plugin-plugins',
        name: '插件管理',
        path: '/plugins',
        entry: '',
        category: '',
        menu: ['插件管理'],
      },
      {
        id: 'plugin-users',
        name: '用户管理',
        path: '/users',
        entry: '',
        category: '',
        menu: ['用户管理'],
      },
    ].map((item) => {
      return {
        ...item,
        icon: 'summary',
        entry: `http://127.0.0.1:${item.path === '/plugins' ? '3001' : '3002'}`,
      };
    });
    resolve(entriesToMenuInfo(entries));
  });
}

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

//       return entriesToMenuInfo(entries);
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.log('error', error);
//       return MENUS;
//     });
// }

export { fetchMenus };
