import type { Colors } from '@tkeel/console-themes';

import type { UseConfigQueryOnSuccess } from '../useConfigQuery';
import useConfigQuery from '../useConfigQuery';

export interface ThemeColorsConfig extends Colors {
  enableColorCoordination: boolean;
}

interface Props {
  onSuccess: UseConfigQueryOnSuccess<ThemeColorsConfig>;
}

export default function useConfigThemeColorsQuery(props?: Props) {
  const onSuccess = props?.onSuccess;
  const params = {
    key: 'theme',
    path: 'colors',
    ...(onSuccess ? { onSuccess } : {}),
  };

  const { isSuccess, config, ...rest } =
    useConfigQuery<ThemeColorsConfig>(params);

  let colors: Colors | undefined;
  const { enableColorCoordination, ...restColors } = config || {};
  if (isSuccess) {
    colors = restColors as Colors;
  }

  return {
    ...rest,
    isSuccess,
    colors,
    enableColorCoordination,
  };
}
