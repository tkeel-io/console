import 'react-toastify/dist/ReactToastify.css';

import { merge } from 'lodash';
import {
  ToastContainer as ToastifyToastContainer,
  ToastContainerProps,
} from 'react-toastify';

import { useStatusColors } from '@tkeel/console-hooks';

import { DEFAULT_TOAST_CONTAINER_PROPS } from './constants';
import { StyledWrapper } from './styled';

export default function ToastContainer(props: ToastContainerProps) {
  const properties = merge({}, DEFAULT_TOAST_CONTAINER_PROPS, props);
  const statusColors = useStatusColors();

  return (
    <StyledWrapper statusColors={statusColors}>
      <ToastifyToastContainer {...properties} />
    </StyledWrapper>
  );
}
