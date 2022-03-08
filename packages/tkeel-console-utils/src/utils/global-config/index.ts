import { getGlobalPluginProps } from '../plugin';

// eslint-disable-next-line import/prefer-default-export
export function getGlobalPortalConfigCrossEnv() {
  const globalPluginProps = getGlobalPluginProps();
  const portalProps = globalPluginProps?.portalProps;

  if (typeof portalProps === 'object' && portalProps) {
    return portalProps;
  }

  if (typeof GLOBAL_PORTAL_CONFIG === 'object' && GLOBAL_PORTAL_CONFIG) {
    return GLOBAL_PORTAL_CONFIG;
  }

  return null;
}
