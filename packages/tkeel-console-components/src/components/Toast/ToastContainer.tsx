import 'react-toastify/dist/ReactToastify.css';

import {
  ToastContainer as Container,
  ToastContainerProps,
} from 'react-toastify';

export default function ToastContainer(props: ToastContainerProps) {
  return <Container {...props} />;
}
