import kubesphereLight from './themes/kubesphere-light';
import tKeelLight from './themes/tkeel-light';

const themes = {
  'kubesphere-light': kubesphereLight,
  'tkeel-light': tKeelLight,
};

export enum ThemeNames {
  KubesphereLight = 'kubesphere-light',
  TKeelLight = 'tkeel-light',
}

export const DEFAULT_THEME_NAME = ThemeNames.TKeelLight;

export const DEFAULT_THEME = themes[DEFAULT_THEME_NAME];

export { default as kubesphereLight } from './themes/kubesphere-light';
export { default as tKeelLight } from './themes/tkeel-light';

export default themes;
