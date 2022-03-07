/* eslint-disable import/prefer-default-export */
export function getGlobalConfig() {
  if (typeof GLOBAL_PLUGIN_CONFIG === 'object') {
    return GLOBAL_PLUGIN_CONFIG;
  }

  if (typeof GLOBAL_PORTAL_CONFIG === 'object') {
    return GLOBAL_PORTAL_CONFIG;
  }

  return null;
}
