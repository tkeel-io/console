import { useTheme } from '@chakra-ui/react';
import { merge } from 'lodash';
import {
  ToastContainer as ToastifyToastContainer,
  ToastContainerProps,
} from 'react-toastify';

import { useStatusInfos } from '@tkeel/console-hooks';
import { Theme } from '@tkeel/console-themes';

import { DEFAULT_TOAST_CONTAINER_PROPS } from './constants';
import { StyledWrapper } from './styled';

export default function ToastContainer(props: ToastContainerProps) {
  const properties = merge({}, DEFAULT_TOAST_CONTAINER_PROPS, props);
  const { colors }: Theme = useTheme();
  const statusInfos = useStatusInfos();

  return (
    <StyledWrapper colors={colors} statusInfos={statusInfos}>
      <ToastifyToastContainer {...properties} />
    </StyledWrapper>
  );
}
