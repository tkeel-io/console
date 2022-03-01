/* eslint-disable import/prefer-default-export */
export function getGlobalConfig() {
  if (typeof PLUGIN_GLOBALS === 'object') {
    return PLUGIN_GLOBALS;
  }

  if (typeof PORTAL_GLOBALS === 'object') {
    return PORTAL_GLOBALS;
  }

  return null;
}
