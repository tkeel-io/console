import { useFavicon, useTitle } from 'react-use';

import { usePortalAdminConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function DocumentHead() {
  const { config } = usePortalAdminConfigPortalQuery();
  const documentTitle = config?.client.documentTitle ?? '';
  const favicon = config?.client.favicon ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);

  return null;
}
