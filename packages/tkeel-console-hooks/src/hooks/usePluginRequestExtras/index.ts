import { useGlobalPluginProps } from '@tkeel/console-business-components';
import { createHandleNoAuth } from '@tkeel/console-utils';

import useNoAuthRedirectPath from '../useNoAuthRedirectPath';

export default function usePluginRequestExtras() {
  const { portalName, tokenInfo, navigate } = useGlobalPluginProps();
  const { basePath } = PLUGIN_GLOBALS;
  const redirectPath = useNoAuthRedirectPath({ portalName, basePath });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });

  return { tokenInfo, handleNoAuth };
}
