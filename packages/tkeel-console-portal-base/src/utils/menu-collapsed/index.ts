import store from 'store2';

const namespace = `${PORTAL_GLOBALS.portalName}.menu`;
const key = 'menuCollapsed';
const menuCollapsedStore = store.namespace(namespace);

export type MenuCollapsed = 'true' | 'false';

export function getLocalMenuCollapsed(): MenuCollapsed {
  return menuCollapsedStore.get(key) as MenuCollapsed;
}

export function setLocalMenuCollapsed(menuCollapsed: MenuCollapsed) {
  menuCollapsedStore.set(key, menuCollapsed);
}

export function isCollapsedMenu(menuCollapsed?: MenuCollapsed) {
  return (menuCollapsed || getLocalMenuCollapsed()) === 'true';
}

export function removeLocalMenuCollapsed() {
  menuCollapsedStore.remove(key);
}
