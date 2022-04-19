import { Tab } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Theme } from '@tkeel/console-themes';

type StyledTabProps = Pick<Theme, 'colors'>;

// eslint-disable-next-line import/prefer-default-export
export const StyledTab = styled(Tab)<StyledTabProps>`
  border: 0;
  border-color: none;
  border-radius: 16px;
  margin: 0;
  padding: 4px 12px;
  min-width: 124px;
  min-height: 28px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ colors }) => colors.gray[800]};
  outline: 0;

  &[aria-selected='true'] {
    background-color: ${({ colors }) => colors.gray[800]};
    color: ${({ colors }) => colors.white};
  }

  &:focus {
    box-shadow: none;
  }
`;
