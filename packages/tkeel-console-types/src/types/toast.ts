import { ReactNode } from 'react';
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

export type ToastFunctionArg1 = ToastOptions | ToastContent;

export type ToastFunctionArg2 = Omit<ToastOptions, 'title' | 'description'>;

interface ToastBaseFunction {
  (options: ToastOptions): string | number;
  (content: ToastContent, options?: ToastFunctionArg2): string | number;
}

export interface ToastFunction extends ToastBaseFunction {
  info: ToastBaseFunction;
  success: ToastBaseFunction;
  warning: ToastBaseFunction;
  error: ToastBaseFunction;
}
