import { getGlobalPluginProps } from '../plugin';

// eslint-disable-next-line import/prefer-default-export
export function getGlobalPortalConfig() {
  const globalPluginProps = getGlobalPluginProps();

  if (globalPluginProps && typeof globalPluginProps === 'object') {
    return globalPluginProps;
  }

  if (GLOBAL_PORTAL_CONFIG && typeof GLOBAL_PORTAL_CONFIG === 'object') {
    return GLOBAL_PORTAL_CONFIG;
  }

  return null;
}
