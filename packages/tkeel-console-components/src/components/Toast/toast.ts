import { toast as toastBase, ToastContent, ToastOptions } from 'react-toastify';

interface Props extends ToastOptions {
  status: 'success' | 'warning' | 'error';
  title?: ToastContent;
}

export default function toast({ title, ...options }: Props) {
  return toastBase(title, options);
}
