import kubesphereLight from './themes/kubesphere-light';

const themes = {
  'kubesphere-light': kubesphereLight,
};

export enum ThemeNames {
  KubesphereLight = 'kubesphere-light',
}

export const DEFAULT_THEME_NAME = ThemeNames.KubesphereLight;

export const DEFAULT_THEME = themes[DEFAULT_THEME_NAME];

export { default as kubesphereLight } from './themes/kubesphere-light';

export default themes;
