import 'react-toastify/dist/ReactToastify.css';

import { merge } from 'lodash';
import {
  ToastContainer as ToastifyContainer,
  ToastContainerProps,
} from 'react-toastify';

import { DEFAULT_TOAST_CONTAINER_PROPS } from './defaults';

export default function ToastContainer(props: ToastContainerProps) {
  const properties = merge({}, DEFAULT_TOAST_CONTAINER_PROPS, props);
  return <ToastifyContainer {...properties} />;
}
