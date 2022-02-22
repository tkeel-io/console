import { Box, Colors } from '@chakra-ui/react';
import styled from '@emotion/styled';

import iconCheckbox from './assets/icons/checkbox.svg';
import iconCheckboxChecked from './assets/icons/checkbox-checked.svg';
import iconCheckboxIndeterminate from './assets/icons/checkbox-indeterminate.svg';
import { PREFIX_CLS } from './constants';

import 'rc-tree/assets/index.css';

type Props = {
  colors: Colors;
  extras?: {
    isTreeTitleFullWidth?: boolean;
  };
  styles?: {
    treeNodeContentWrapper?: string;
    treeTitle?: string;
  };
};

const treePrefixCls = PREFIX_CLS;
const treeNodePrefixCls = `${treePrefixCls}-treenode`;

// eslint-disable-next-line import/prefer-default-export
export const StyledWrapper = styled(Box)<Props>`
  .${treePrefixCls} {
    .${treeNodePrefixCls} {
      display: flex;
      align-items: center;
      height: 24px;
      padding: 0 4px;
      border-radius: 4px;

      .${treePrefixCls}-node-content-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        ${(props) => (props?.extras?.isTreeTitleFullWidth ? 'flex: 1;' : '')}
        ${(props) => props?.styles?.treeNodeContentWrapper}
      }

      span {
        &.${treePrefixCls}-switcher,
          &.${treePrefixCls}-checkbox,
          &.${treePrefixCls}-iconEle {
          width: 16px;
          height: 16px;
          margin-right: 4px;
          line-height: 16px;
        }

        &.${treePrefixCls}-icon_loading {
          margin-right: 4px;
        }

        &.${treePrefixCls}-switcher {
          background-image: none;
        }

        &.${treePrefixCls}-checkbox {
          width: 16px;
          height: 16px;
          margin-right: 4px;
          margin-left: 0;
          background-image: url(${iconCheckbox});
          background-position: center;
          background-size: 12px 12px;

          &-checked {
            background-image: url(${iconCheckboxChecked});
            background-position: center;
            background-size: 100% 100%;
          }

          &-indeterminate {
            background-image: url(${iconCheckboxIndeterminate});
            background-position: center;
            background-size: 100% 100%;
          }
        }

        &.${treePrefixCls}-title {
          color: ${(props) => props.colors.gray[800] as string};
          font-size: 12px;
          line-height: 24px;
          ${(props) => (props?.extras?.isTreeTitleFullWidth ? 'flex: 1;' : '')}
          ${(props) => props?.styles?.treeTitle}
        }
      }

      &-selected {
        & > .${treePrefixCls}-switcher {
          & > svg {
            fill: ${(props) => props.colors.primary} !important;
          }
        }

        & > .${treePrefixCls}-node-selected {
          background-color: transparent;
          box-shadow: none;
          opacity: 1;

          span.${treePrefixCls}-title {
            color: ${(props) => props.colors.primary};
            font-weight: 500;
          }
        }
      }

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }

      &:hover {
        background-color: ${(props) => props.colors.primarySub};

        & > .${treePrefixCls}-switcher {
          & > svg {
            fill: ${(props) => props.colors.primary} !important;
          }
        }

        span {
          &.${treePrefixCls}-title {
            color: ${(props) => props.colors.primary};
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
  }
`;
