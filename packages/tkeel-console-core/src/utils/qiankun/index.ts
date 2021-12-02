import { registerMicroApps, start } from 'qiankun';

import { IApp } from './types';

import { IMenu } from '@/mock/types';
import theme from '@/theme';

function menusToApps({ menus }: { menus: IMenu[] }): IApp[] {
  const token = '123456';
  return menus.map(({ name, path, entry }) => ({
    name,
    entry,
    container: `#sub-app`,
    activeRule: path,
    props: {
      token,
      theme,
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
