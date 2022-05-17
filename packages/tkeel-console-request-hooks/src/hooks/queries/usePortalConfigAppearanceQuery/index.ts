import type { Appearance } from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';

import usePortalConfigQuery from '../usePortalConfigQuery';

export default function usePortalConfigAppearanceQuery() {
  let config: Appearance | undefined;
  const {
    isSuccess,
    config: configByServer,
    ...rest
  } = usePortalConfigQuery<Partial<Appearance>>({
    key: 'appearance',
    path: 'config',
  });
  if (isSuccess) {
    config = { ...APPEARANCE, ...configByServer };
  }

  return { ...rest, isSuccess, configByServer, config };
}
