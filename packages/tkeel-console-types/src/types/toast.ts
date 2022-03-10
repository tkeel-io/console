import { ReactText } from 'react';
import {
  ToastContent,
  ToastOptions as ToastifyToastOptions,
} from 'react-toastify';

export interface ToastOptions extends ToastifyToastOptions {
  status: 'success' | 'warning' | 'error';
  title?: ToastContent;
}

export interface ToastFunction {
  (options: ToastOptions): ReactText;
}
