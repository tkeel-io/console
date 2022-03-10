import 'react-toastify/dist/ReactToastify.css';

import {
  ToastContainer as ToastifyContainer,
  ToastContainerProps,
} from 'react-toastify';

export default function ToastContainer(props: ToastContainerProps) {
  return <ToastifyContainer {...props} />;
}
