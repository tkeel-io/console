import 'react-toastify/dist/ReactToastify.css';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Theme } from '@tkeel/console-themes';
import { StatusInfos } from '@tkeel/console-utils';

interface StyledWrapperProps extends Pick<Theme, 'colors'> {
  statusInfos: StatusInfos;
}

export const StyledWrapper = styled(Box)<StyledWrapperProps>`
  --toastify-color-info: ${(props) => props.statusInfos.info.colors.secondary};
  --toastify-color-success: ${(props) =>
    props.statusInfos.success.colors.secondary};
  --toastify-color-warning: ${(props) =>
    props.statusInfos.warning.colors.secondary};
  --toastify-color-error: ${(props) =>
    props.statusInfos.error.colors.secondary};
  --toastify-toast-min-height: 40px;
  --toastify-text-color-light: ${(props) => props.colors.gray[700]};
  --toastify-text-color-info: ${(props) => props.colors.gray[700]};
  --toastify-text-color-success: ${(props) => props.colors.gray[700]};
  --toastify-text-color-warning: ${(props) => props.colors.gray[700]};
  --toastify-text-color-error: ${(props) => props.colors.gray[700]};

  .Toastify__toast {
    padding: 8px 12px 8px 20px;
    margin-bottom: 12px;
    border-radius: 4px;
    box-shadow: none;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__toast-icon {
    width: 20px;
    margin-inline-end: 12px;
  }

  .Toastify__toast-theme--colored {
    border-width: 1px;
    border-style: solid;
    box-shadow: 0px 8px 8px rgba(182, 194, 205, 0.2);

    &.Toastify__toast--info {
      border-color: ${(props) => props.statusInfos.info.colors.primary};
    }

    &.Toastify__toast--success {
      border-color: ${(props) => props.statusInfos.success.colors.primary};
    }

    &.Toastify__toast--warning {
      border-color: ${(props) => props.statusInfos.warning.colors.primary};
    }

    &.Toastify__toast--error {
      border-color: ${(props) => props.statusInfos.error.colors.primary};
    }
  }

  .Toastify__close-button {
    align-self: center;
    margin-inline-start: 12px;

    & > svg {
      width: 16px;
      height: 16px;
    }
  }

  .Toastify__close-button--light,
  .Toastify__close-button--colored {
    color: ${(props) => props.colors.grayAlternatives[300]};
    opacity: 1;

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
`;

export const StyledToastContent = styled(Box)`
  font-size: 14px;
  line-height: 24px;
`;
