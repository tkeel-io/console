import * as auth from '../auth';
import * as env from '../env';
import * as plugin from '../plugin';

export function getLocalTokenInfo() {
  if (env.isPortal()) {
    return auth.getLocalTokenInfo();
  }
  const portalProps = plugin.getPortalProps();
  return portalProps?.client.tokenInfo;
}
