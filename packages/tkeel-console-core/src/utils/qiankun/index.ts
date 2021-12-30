import themes, { DEFAULT_THEME_NAME, ThemeNames } from '@tkeel/console-themes';
import { registerMicroApps, start } from 'qiankun';

import { App, MenuInfo } from './types';

import { Menu } from '@/mock/types';

function getTotalMenus(menus: Menu[]): MenuInfo[] {
  let menuInfoArr: MenuInfo[] = [];

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
      menuInfoArr = [...menuInfoArr, ...(children as MenuInfo[])];
    }
  });

  return menuInfoArr;
}

function menusToApps({
  menus,
  themeName = DEFAULT_THEME_NAME,
}: {
  menus: Menu[];
  themeName?: ThemeNames;
}): App[] {
  const token = '123456';
  const totalMenus: MenuInfo[] = getTotalMenus(menus);

  return totalMenus.map(({ id, name, path, entry }) => ({
    name,
    entry,
    container: `#${id}`,
    activeRule: path,
    props: {
      token,
      themeName,
      theme: themes[themeName],
    },
  }));
}

function register({ apps }: { apps: App[] }): void {
  registerMicroApps(apps);
}

function init({
  menus,
  themeName,
}: {
  menus: Menu[];
  themeName: ThemeNames;
}): void {
  const apps = menusToApps({ menus, themeName });
  register({ apps });
  start();
}

export { getTotalMenus, init, menusToApps, register };
