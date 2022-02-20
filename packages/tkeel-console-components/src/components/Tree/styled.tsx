import { Box, Colors } from '@chakra-ui/react';
import styled from '@emotion/styled';

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
      }

      span {
        &.${treePrefixCls}-switcher {
          width: 16px;
          height: 16px;
          background: none;
        }
      }
    }
  }
`;
