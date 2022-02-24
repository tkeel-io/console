import store from 'store2';

const namespace = `${GLOBAL_CONFIG.platformName}.theme`;
const key = 'menuTheme';
const menuThemeStore = store.namespace(namespace);

type MenuTheme = 'dark' | 'light';

export function getLocalMenuTheme(): MenuTheme {
  return menuThemeStore.get(key) as MenuTheme;
}

export function setLocalMenuTheme(menuTheme: MenuTheme) {
  menuThemeStore.set(key, menuTheme);
}

export function isDarkMenuTheme(menuTheme?: MenuTheme) {
  return (menuTheme || getLocalMenuTheme()) === 'dark';
}

export function removeLocalMenuTheme() {
  menuThemeStore.remove(key);
}
