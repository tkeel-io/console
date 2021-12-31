import themes, { DEFAULT_THEME_NAME, ThemeNames } from '@tkeel/console-themes';
import { PluginProps, TokenData } from '@tkeel/console-types';
import { registerMicroApps, start } from 'qiankun';

import { App, MenuInfo } from './types';

import { Menu } from '@/core/hooks/queries/useMenusQuery';

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
  const tokenData: TokenData = {
    access_token: '',
    expires_in: 1,
    refresh_token: '',
    token_type: '',
  };
  const totalMenus: MenuInfo[] = getTotalMenus(menus);
  const props: PluginProps = {
    tokenData,
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
