import { NavigateFunction } from 'react-router-dom';
import { PlatformNames } from '@tkeel/console-constants';
import themes, { DEFAULT_THEME_NAME, ThemeNames } from '@tkeel/console-themes';
import { Menu, PluginGlobalProps } from '@tkeel/console-types';
import { getLocalTokenInfo } from '@tkeel/console-utils';
import { registerMicroApps, start } from 'qiankun';

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
  platformName,
  menus,
  navigate,
  themeName = DEFAULT_THEME_NAME,
}: {
  platformName: PlatformNames;
  menus: Menu[];
  navigate: NavigateFunction;
  themeName: ThemeNames;
}): App[] {
  const totalMenus: MenuInfo[] = getTotalMenus(menus);
  const tokenInfo = getLocalTokenInfo();
  const props: PluginGlobalProps = {
    platformName,
    tokenInfo,
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
  platformName,
  menus,
  navigate,
  themeName,
}: {
  platformName: PlatformNames;
  menus: Menu[];
  navigate: NavigateFunction;
  themeName: ThemeNames;
}) {
  const apps = menusToApps({ platformName, menus, navigate, themeName });
  register({ apps });
  start();
}

export { init, menusToApps };
