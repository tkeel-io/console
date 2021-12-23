import themes from '@tkeel/console-themes';
import { registerMicroApps, start } from 'qiankun';

import { THEME } from '@/constants';

import { IApp, IMenuInfo } from './types';

import { IMenu } from '@/mock/types';

function getTotalMenus(menus: IMenu[]): IMenuInfo[] {
  let menuInfoArr: IMenuInfo[] = [];

  menus.forEach((menu) => {
    const { id, name, path, entry, children } = menu;
    if (path && entry) {
      menuInfoArr.push({
        id,
        name,
        path,
        entry,
      });
    }
    if (children) {
      menuInfoArr = [...menuInfoArr, ...(children as IMenuInfo[])];
    }
  });

  return menuInfoArr;
}

function menusToApps({ menus }: { menus: IMenu[] }): IApp[] {
  const token = '123456';
  const totalMenus: IMenuInfo[] = getTotalMenus(menus);

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
  register({ apps });
  start({
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: true,
    },
  });
}

export { getTotalMenus, init, menusToApps, register };
