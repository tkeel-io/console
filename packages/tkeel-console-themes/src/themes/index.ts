import type { ThemeName } from '@tkeel/console-types';
import { env, plugin } from '@tkeel/console-utils';

import qingcloudLight from './qingcloud-light';
import tKeelLight from './tkeel-light';

export enum ThemeNames {
  TKeelLight = 'tkeel-light',
  QingCloudLight = 'qingcloud-light',
}

const DEFAULT_THEME_NAME: ThemeName = ThemeNames.TKeelLight;

function getThemeNameInPortal() {
  const { THEME_NAME } = process.env;
  const { themeName } = GLOBAL_PORTAL_CONFIG.client;
  const currentThemeName = THEME_NAME ?? themeName;

  return (
    currentThemeName in ThemeNames ? currentThemeName : DEFAULT_THEME_NAME
  ) as ThemeName;
}

const themes = {
  'tkeel-light': tKeelLight,
  'qingcloud-light': qingcloudLight,
};

const DEFAULT_THEME = themes[DEFAULT_THEME_NAME];

export function getTheme() {
  const isPortal = env.isPortal();

  if (!isPortal) {
    return plugin.getPortalProps().client.theme;
  }

  const name = getThemeNameInPortal();
  return themes[name] ?? DEFAULT_THEME;
}
