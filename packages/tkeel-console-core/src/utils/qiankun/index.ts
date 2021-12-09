import { registerMicroApps, start } from 'qiankun';

import { THEME } from '@/constants';

import { IApp, IMenuInfo } from './types';

import themes from '@/styles/themes';

import { IMenu, IMenuDetail } from '@/mock/types';

function getMenus(menus: IMenuDetail[]): IMenuInfo[] {
  const menuInfoArr: IMenuInfo[] = [];
  const recursiveMenus = (menuArr: IMenuDetail[]) => {
    menuArr.forEach((menu) => {
      if (menu.path && menu.entry) {
        menuInfoArr.push(menu as IMenuInfo);
      }
      if (menu.children) {
        recursiveMenus(menu.children);
      }
    });
  };
  recursiveMenus(menus);
  return menuInfoArr;
}

function menusToApps({ menus }: { menus: IMenu[] }): IApp[] {
  const token = '123456';
  let totalMenus: IMenuInfo[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const menu of menus) {
    totalMenus = [...totalMenus, ...getMenus(menu.menus)];
  }
  return totalMenus.map(({ id, name, path, entry }) => ({
    name,
    entry,
    container: `#${id}`,
    activeRule: path,
    props: {
      token,
      theme: themes[THEME],
    },
  }));
}

function register({ apps }: { apps: IApp[] }): void {
  registerMicroApps(apps);
}

function init({ menus }: { menus: IMenu[] }): void {
  const apps = menusToApps({ menus });
  // eslint-disable-next-line no-console
  console.log('init ~ apps', apps);
  register({ apps });
  start({
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: true,
    },
  });
}

export { menusToApps, register, init };
