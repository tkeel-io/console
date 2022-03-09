import { toast as toastBase, ToastContent } from 'react-toastify';

type Props = {
  status: 'success' | 'warn' | 'error';
  title?: ToastContent;
};

export default function toast({ title }: Props) {
  return toastBase(title);
}
