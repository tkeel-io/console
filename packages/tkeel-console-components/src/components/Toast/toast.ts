import {
  toast as toastifyToast,
  ToastContent,
  ToastOptions,
} from 'react-toastify';

export default function toast(content: ToastContent, options?: ToastOptions) {
  return toastifyToast(content, options);
}
