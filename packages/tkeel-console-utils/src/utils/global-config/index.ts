import { getPortalProps } from '../plugin';

export function getGlobalPortalConfigCrossEnv() {
  const portalProps = getPortalProps();

  if (typeof portalProps === 'object' && portalProps) {
    return portalProps;
  }

  if (typeof GLOBAL_PORTAL_CONFIG === 'object' && GLOBAL_PORTAL_CONFIG) {
    return GLOBAL_PORTAL_CONFIG;
  }

  return null;
}
