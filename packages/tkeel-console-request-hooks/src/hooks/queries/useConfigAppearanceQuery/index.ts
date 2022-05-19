import type { Appearance } from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';

import useConfigQuery from '../useConfigQuery';

export default function useConfigAppearanceQuery() {
  let config: Appearance | undefined;
  const {
    isSuccess,
    config: configByServer,
    ...rest
  } = useConfigQuery<Partial<Appearance>>({
    key: 'appearance',
    path: 'config',
  });
  if (isSuccess) {
    config = { ...APPEARANCE, ...configByServer };
  }

  return { ...rest, isSuccess, configByServer, config };
}
