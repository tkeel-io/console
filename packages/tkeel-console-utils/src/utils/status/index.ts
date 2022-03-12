import { StatusIcon } from '@tkeel/console-components';

import { GetStatusInfosOptions, StatusInfos } from './types';

export { type GetStatusInfosOptions, type StatusInfos } from './types';
export function getStatusInfos({
  colors,
}: GetStatusInfosOptions = {}): StatusInfos {
  return {
    default: {
      icon: null,
      colors: {
        primary: '',
        secondary: '',
      },
    },
    info: {
      icon: StatusIcon.Info,
      colors: {
        primary: colors?.blue[300] ?? '',
        secondary: colors?.blue[50] ?? '',
      },
    },
    success: {
      icon: StatusIcon.Success,
      colors: {
        primary: colors?.green[300] ?? '',
        secondary: colors?.green[50] ?? '',
      },
    },
    warning: {
      icon: StatusIcon.Warning,
      colors: {
        primary: colors?.orange[300] ?? '',
        secondary: colors?.orange[50] ?? '',
      },
    },
    error: {
      icon: StatusIcon.Error,
      colors: {
        primary: colors?.red[300] ?? '',
        secondary: colors?.red[100] ?? '',
      },
    },
  };
}
