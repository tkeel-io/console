import qingcloudLight from './qingcloud-light';
import tKeelLight from './tkeel-light';

export const themes = {
  'tkeel-light': tKeelLight,
  'qingcloud-light': qingcloudLight,
};

export enum ThemeNames {
  TKeelLight = 'tkeel-light',
  QingCloudLight = 'qingcloud-light',
}

export const DEFAULT_THEME_NAME = ThemeNames.TKeelLight;

export const DEFAULT_THEME = themes[DEFAULT_THEME_NAME];
