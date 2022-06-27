import type { Appearance } from '@tkeel/console-themes';
import { getAppearance } from '@tkeel/console-themes';

import useConfigQuery from '../useConfigQuery';

export default function useConfigAppearanceQuery() {
  let config: Appearance | undefined;
  const appearance = getAppearance();
  const {
    isSuccess,
    config: configByServer,
    ...rest
  } = useConfigQuery<Partial<Appearance>>({
    key: 'appearance',
    path: 'config',
  });
  if (isSuccess) {
    config = { ...appearance, ...configByServer };
  }

  return { ...rest, isSuccess, configByServer, config };
}
