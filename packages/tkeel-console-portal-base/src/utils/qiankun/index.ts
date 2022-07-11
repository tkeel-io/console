import { WithCSSVar } from '@chakra-ui/react';
import { FrameworkLifeCycles, registerMicroApps, start } from 'qiankun';
import { NavigateFunction } from 'react-router-dom';

import { toast } from '@tkeel/console-components';
import { getAppearance } from '@tkeel/console-themes';
import {
  GlobalPluginPropsPortalProps,
  Menu,
  UserDocumentsReturns,
} from '@tkeel/console-types';
import { getLocalTenantInfo, getLocalTokenInfo } from '@tkeel/console-utils';

import { App, MenuInfo } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LifeCycles = FrameworkLifeCycles<Record<string, any>>;

export interface InitOptions {
  theme: WithCSSVar<unknown>;
  menus: Menu[];
  documents: UserDocumentsReturns;
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
  theme,
  menus,
  documents,
  navigate,
  refetchMenus,
}: InitOptions): App[] {
  const totalMenus: MenuInfo[] = getTotalMenus(menus);
  const appearance = getAppearance();
  const tokenInfo = getLocalTokenInfo();
  const tenantInfo = getLocalTenantInfo();
  const portalProps: GlobalPluginPropsPortalProps = {
    portalName: GLOBAL_PORTAL_CONFIG.portalName,
    client: {
      theme,
      appearance,
      tenantInfo,
      tokenInfo,
      toast,
      documents,
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
    props: { portalProps },
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
  theme,
  menus,
  documents,
  navigate,
  lifeCycles,
  refetchMenus,
}: InitOptions) {
  const apps = menusToApps({ theme, menus, documents, navigate, refetchMenus });
  register({ apps, lifeCycles });
  start({ sandbox: true });
}
