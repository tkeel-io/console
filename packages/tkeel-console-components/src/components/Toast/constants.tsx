import { ToastContainerProps, ToastOptions } from 'react-toastify';

import * as StatusIcon from '../StatusIcon';

export const DEFAULT_TOAST_CONTAINER_PROPS: Partial<ToastContainerProps> = {
  autoClose: false,
  hideProgressBar: true,
  /* style: {
    backgroundColor: 'red',
  }, */
  /* bodyStyle: {
    backgroundColor: 'green',
  }, */
  /* toastStyle: {
    backgroundColor: 'yellow',
  }, */
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
