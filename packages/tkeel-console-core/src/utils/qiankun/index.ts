import { registerMicroApps, start } from 'qiankun';

import { THEME } from '@/constants';

import { IApp } from './types';

import themes from '@/styles/themes';

import { IMenu, ISubMenu } from '@/mock/types';

function menusToApps({ menus }: { menus: IMenu[] }): IApp[] {
  const token = '123456';
  let subMenus: ISubMenu[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const menu of menus) {
    subMenus = [...subMenus, ...menu.subMenus];
  }
  return subMenus.map(({ name, path, entry }) => ({
    name,
    entry,
    container: `#sub-app`,
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

export { menusToApps, register, init };
