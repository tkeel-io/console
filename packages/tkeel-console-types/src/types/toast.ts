import { ReactText } from 'react';
import { ToastContent, ToastOptions } from 'react-toastify';

export interface ToastFunction {
  (content: ToastContent, options?: ToastOptions): ReactText;
}
