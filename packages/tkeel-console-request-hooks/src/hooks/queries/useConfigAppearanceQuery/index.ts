import type { Appearance } from '@tkeel/console-themes';
import { appearances } from '@tkeel/console-themes';

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
    config = { ...appearances.tkeel, ...configByServer };
  }

  return { ...rest, isSuccess, configByServer, config };
}
