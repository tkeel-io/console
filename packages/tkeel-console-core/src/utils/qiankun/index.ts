import { toast } from '@tkeel/console-components';
import themes, { DEFAULT_THEME_NAME, ThemeNames } from '@tkeel/console-themes';
import { registerMicroApps, start } from 'qiankun';

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

function menusToApps({
  menus,
  themeName = DEFAULT_THEME_NAME,
}: {
  menus: IMenu[];
  themeName?: ThemeNames;
}): IApp[] {
  const token = '123456';
  const totalMenus: IMenuInfo[] = getTotalMenus(menus);

  return totalMenus.map(({ id, name, path, entry }) => ({
    name,
    entry,
    container: `#${id}`,
    activeRule: path,
    props: {
      token,
      themeName,
      theme: themes[themeName],
      toast,
    },
  }));
}

function register({ apps }: { apps: IApp[] }): void {
  registerMicroApps(apps);
}

function init({
  menus,
  themeName,
}: {
  menus: IMenu[];
  themeName: ThemeNames;
}): void {
  const apps = menusToApps({ menus, themeName });
  register({ apps });
  start({
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: true,
    },
  });
}

export { getTotalMenus, init, menusToApps, register };
