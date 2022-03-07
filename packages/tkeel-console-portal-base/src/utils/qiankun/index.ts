import { FrameworkLifeCycles, registerMicroApps, start } from 'qiankun';
import { NavigateFunction } from 'react-router-dom';

import themes, { DEFAULT_THEME_NAME } from '@tkeel/console-themes';
import { BaseGlobalPluginProps, Menu } from '@tkeel/console-types';
import { getLocalTokenInfo } from '@tkeel/console-utils';

import { App, MenuInfo } from './types';

export type LifeCycles = FrameworkLifeCycles<Record<string, any>>;

export interface InitOptions {
  menus: Menu[];
  navigate: NavigateFunction;
  lifeCycles?: LifeCycles;
  refetchMenus: () => void;
}

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

export function menusToApps({
  menus,
  navigate,
  refetchMenus,
}: InitOptions): App[] {
  const themeName = GLOBAL_PORTAL_CONFIG.client.themeName || DEFAULT_THEME_NAME;
  const totalMenus: MenuInfo[] = getTotalMenus(menus);
  const tokenInfo = getLocalTokenInfo();
  const props: BaseGlobalPluginProps = {
    portalName: GLOBAL_PORTAL_CONFIG.portalName,
    client: {
      themeName,
      theme: themes[themeName],
      tokenInfo,
      navigate,
      refetchMenus,
    },
    backend: GLOBAL_PORTAL_CONFIG.backend,
  };

  return totalMenus.map(({ id, name, path, entry }) => ({
    name,
    entry,
    container: `#${id}`,
    activeRule: path,
    props,
  }));
}

function register({
  apps,
  lifeCycles,
}: {
  apps: App[];
  lifeCycles?: LifeCycles;
}): void {
  registerMicroApps(apps, lifeCycles);
}

export function init({
  menus,
  navigate,
  lifeCycles,
  refetchMenus,
}: InitOptions) {
  const apps = menusToApps({ menus, navigate, refetchMenus });
  register({ apps, lifeCycles });
  start();
}
