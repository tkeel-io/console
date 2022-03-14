import { ToastContainerProps } from 'react-toastify';

export const DEFAULT_TOAST_CONTAINER_PROPS: Partial<ToastContainerProps> = {
  position: 'top-right',
  theme: 'colored',
  autoClose: 3000,
  hideProgressBar: true,
};

export const DEFAULT_STATUS = 'default';
