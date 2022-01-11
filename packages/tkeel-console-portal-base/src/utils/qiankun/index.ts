import { NavigateFunction } from 'react-router-dom';
import themes, { DEFAULT_THEME_NAME, ThemeNames } from '@tkeel/console-themes';
import { PluginGlobalProps } from '@tkeel/console-types';
import { getLocalTokenData } from '@tkeel/console-utils';
import { registerMicroApps, start } from 'qiankun';

import { Menu } from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import { App, MenuInfo } from './types';

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
  navigate,
  themeName = DEFAULT_THEME_NAME,
}: {
  menus: Menu[];
  navigate: NavigateFunction;
  themeName: ThemeNames;
}): App[] {
  const totalMenus: MenuInfo[] = getTotalMenus(menus);
  const tokenData = getLocalTokenData();
  const props: PluginGlobalProps = {
    tokenData,
    navigate,
    themeName,
    theme: themes[themeName],
  };

  return totalMenus.map(({ id, name, path, entry }) => ({
    name,
    entry,
    container: `#${id}`,
    activeRule: path,
    props,
  }));
}

function register({ apps }: { apps: App[] }): void {
  registerMicroApps(apps);
}

function init({
  menus,
  navigate,
  themeName,
}: {
  menus: Menu[];
  navigate: NavigateFunction;
  themeName: ThemeNames;
}) {
  const apps = menusToApps({ menus, navigate, themeName });
  register({ apps });
  start();
}

export { getTotalMenus, init, menusToApps, register };
