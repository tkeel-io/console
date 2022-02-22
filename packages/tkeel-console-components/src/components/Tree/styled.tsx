import { Box, Colors } from '@chakra-ui/react';
import styled from '@emotion/styled';

import iconCheckbox from './assets/icons/checkbox.svg';
import iconCheckboxChecked from './assets/icons/checkbox-checked.svg';
import iconCheckboxIndeterminate from './assets/icons/checkbox-indeterminate.svg';
import { PREFIX_CLS } from './constants';

import 'rc-tree/assets/index.css';

type Props = {
  colors: Colors;
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

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }

      &:hover {
        background-color: ${(props) => props.colors.primarySub2};
        border-radius: 4px;
      }

      .${treePrefixCls}-node-content-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
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
          margin: 0 4px;
          background-image: url(${iconCheckbox});
          background-position: center;
          background-size: 100% 100%;

          &-checked {
            background-image: url(${iconCheckboxChecked});
            background-position: center;
          }

          &-indeterminate {
            background-image: url(${iconCheckboxIndeterminate});
            background-position: center;
          }
        }
      }
    }
  }
`;
