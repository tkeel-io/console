import { merge } from 'lodash';

import { StatusIcon } from '@tkeel/console-components';

import { StatusInfos } from './types';
import useStatusColors from './useStatusColors';

export default function useStatusInfos(): StatusInfos {
  const statusColors = useStatusColors();
  const statusIcons = {
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

  return merge({}, statusColors, statusIcons);
}
