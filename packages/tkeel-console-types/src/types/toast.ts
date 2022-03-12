import { ReactNode, ReactText } from 'react';
import {
  ToastContent as ToastifyToastContent,
  ToastOptions as ToastifyToastOptions,
  TypeOptions,
} from 'react-toastify';

export type ToastContent = Exclude<ToastifyToastContent, Record<string, never>>;

export interface ToastOptions extends Omit<ToastifyToastOptions, 'type'> {
  title: ReactNode;
  description?: ReactNode;
  status?: TypeOptions;
}

export type ToastFunctionArg1 = ToastOptions | ToastContent;

export type ToastFunctionArg2 = Omit<ToastOptions, 'title' | 'description'>;

interface ToastBaseFunction {
  (options: ToastOptions): ReactText;
  (content: ToastContent, options?: ToastFunctionArg2): ReactText;
}

export interface ToastFunction extends ToastBaseFunction {
  info: ToastBaseFunction;
  success: ToastBaseFunction;
  warning: ToastBaseFunction;
  error: ToastBaseFunction;
}
