import type { Colors } from '@tkeel/console-themes';

import useConfigQuery from '../useConfigQuery';

export default function useConfigThemeColorsQuery() {
  const { isSuccess, config, ...rest } = useConfigQuery<Colors>({
    key: 'theme',
    path: 'colors',
  });

  let colors: Colors | undefined;
  if (isSuccess) {
    colors = config;
  }

  return { ...rest, isSuccess, colors };
}
