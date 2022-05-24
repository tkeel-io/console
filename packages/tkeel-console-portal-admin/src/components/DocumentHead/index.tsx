import { useFavicon, useTitle } from 'react-use';

import { useConfigAppearanceQuery } from '@tkeel/console-request-hooks';

export default function DocumentHead() {
  const { config } = useConfigAppearanceQuery();
  const documentTitle = config?.platform?.admin?.platformName ?? '';
  const favicon = config?.common?.logoMark ?? '';

  useTitle(documentTitle);
  useFavicon(favicon);

  return null;
}
