import { useGlobalPluginProps } from '@tkeel/console-business-components';
import { createHandleNoAuth } from '@tkeel/console-utils';

import useNoAuthRedirectPath from '../useNoAuthRedirectPath';

export default function usePluginHandleNoAuth() {
  const { portalName, navigate } = useGlobalPluginProps();
  const { basePath } = GLOBAL_PLUGIN_CONFIG;
  const redirectPath = useNoAuthRedirectPath({ portalName, basePath });
  return createHandleNoAuth({ navigate, redirectPath });
}
