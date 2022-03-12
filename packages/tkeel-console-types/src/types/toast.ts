import { ReactNode, ReactText } from 'react';
import {
  ToastContent as ToastifyToastContent,
  ToastOptions as ToastifyToastOptions,
  TypeOptions,
} from 'react-toastify';

export interface ToastOptions extends Omit<ToastifyToastOptions, 'type'> {
  title: ReactNode;
  description?: ReactNode;
  status?: TypeOptions;
}

export type ToastContent = Exclude<ToastifyToastContent, Record<string, never>>;

export type ToastArg1 = ToastOptions | ToastContent;

export type ToastArg2 = Omit<ToastOptions, 'title' | 'description'>;

export interface ToastFunction {
  (options: ToastOptions): ReactText;
  (content: ToastContent, options?: ToastArg2): ReactText;
}
