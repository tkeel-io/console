import { useFavicon, useTitle } from 'react-use';

import { usePortalTenantConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function DocumentHead() {
  const { config } = usePortalTenantConfigPortalQuery();
  const documentTitle = config?.client.documentTitle ?? '';
  const favicon = config?.client.favicon ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);

  return null;
}
