import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { StatusInfos } from '@tkeel/console-utils';

type StyledWrapperProps = {
  statusInfos: StatusInfos;
};

// eslint-disable-next-line import/prefer-default-export
export const StyledWrapper = styled(Box)<StyledWrapperProps>`
  --toastify-color-info: ${(props) => props.statusInfos.info.colors.secondary};
`;
