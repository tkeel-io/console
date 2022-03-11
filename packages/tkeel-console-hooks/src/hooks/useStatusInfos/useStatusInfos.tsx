import { merge } from 'lodash';

import { StatusIcon } from '@tkeel/console-components';

import { StatusColors, StatusInfos, StatusKeys } from './types';
import useStatusColors from './useStatusColors';

const statusInfos = {
  default: {
    icon: null,
  },
  info: {
    icon: StatusIcon.Info,
  },
  success: {
    icon: StatusIcon.Success,
  },
  warning: {
    icon: StatusIcon.Warning,
  },
  error: {
    icon: StatusIcon.Error,
  },
};
export default function useStatusInfos() {
  const statusColors = useStatusColors();
  const statusColorsInfos = {} as Record<
    StatusKeys,
    { colors: StatusColors[StatusKeys] }
  >;

  Object.entries(statusColors).forEach(([key, value]) => {
    statusColorsInfos[key as StatusKeys] = { colors: value };
  });

  return merge({}, statusInfos, statusColorsInfos) as StatusInfos;
}
