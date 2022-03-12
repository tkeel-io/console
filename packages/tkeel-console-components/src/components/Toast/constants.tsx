import { ToastContainerProps, ToastOptions } from 'react-toastify';

import * as StatusIcon from '../StatusIcon';

export const DEFAULT_TOAST_CONTAINER_PROPS: Partial<ToastContainerProps> = {
  position: 'top-right',
  theme: 'colored',
  autoClose: false,
  hideProgressBar: true,
};

export const DEFAULT_TOAST_OPTIONS: Partial<ToastOptions> =
  DEFAULT_TOAST_CONTAINER_PROPS;

export const DEFAULT_STATUS = 'default';

const size = '20px';

export const STATUS_ICONS = {
  default: {
    icon: false,
  },
  info: {
    icon: <StatusIcon.Info size={size} />,
  },
  success: {
    icon: <StatusIcon.Success size={size} />,
  },
  warning: {
    icon: <StatusIcon.Warning size={size} />,
  },
  error: {
    icon: <StatusIcon.Error size={size} />,
  },
};
