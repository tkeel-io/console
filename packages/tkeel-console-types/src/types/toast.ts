import { ReactNode, ReactText } from 'react';
import {
  ToastContent,
  ToastOptions as ToastifyToastOptions,
  TypeOptions,
} from 'react-toastify';

export interface ToastOptions extends Omit<ToastifyToastOptions, 'type'> {
  title: ReactNode;
  description?: ReactNode;
  status?: TypeOptions;
}

export interface ToastFunction {
  (options: ToastOptions): ReactText;
  (
    content: ToastContent,
    options?: Omit<ToastOptions, 'title' | 'description'>
  ): ReactText;
}
