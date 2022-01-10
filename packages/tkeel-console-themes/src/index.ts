import qingcloudLight from './themes/qingcloud-light';
import tKeelLight from './themes/tkeel-light';

const themes = {
  'qingcloud-light': qingcloudLight,
  'tkeel-light': tKeelLight,
};

export enum ThemeNames {
  QingcloudLight = 'qingcloud-light',
  TKeelLight = 'tkeel-light',
}

export const DEFAULT_THEME_NAME = ThemeNames.TKeelLight;

export const DEFAULT_THEME = themes[DEFAULT_THEME_NAME];

export { default as qingcloudLight } from './themes/qingcloud-light';
export { default as tKeelLight } from './themes/tkeel-light';

export default themes;
