import { useFavicon, useTitle } from 'react-use';

import { usePortalConfigAppearanceQuery } from '@tkeel/console-request-hooks';

export default function DocumentHead() {
  const { config } = usePortalConfigAppearanceQuery();
  const documentTitle = config?.platform?.tenant?.platformName ?? '';
  const favicon = config?.common?.logoMark ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);

  return null;
}
