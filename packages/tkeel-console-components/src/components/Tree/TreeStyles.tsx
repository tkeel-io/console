import 'rc-tree/assets/index.less';

import { Theme, useTheme } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

import iconCheckbox from './assets/icons/checkbox.svg';
import iconCheckboxChecked from './assets/icons/checkbox-checked.svg';
import iconCheckboxIndeterminate from './assets/icons/checkbox-indeterminate.svg';
import { TreeExtrasProps } from './types';

interface Props extends TreeExtrasProps {
  prefixCls: string;
}

type CustomTheme = Theme & {
  colors: {
    primary: string;
    primarySub: string;
    primarySub2: string;
    grayAlternatives: {
      50: string;
    };
  };
};

export default function TreeStyles({ prefixCls, extras, styles }: Props) {
  const treePrefixCls = prefixCls;
  const treeNodePrefixCls = `${treePrefixCls}-treenode`;
  const { colors }: CustomTheme = useTheme();

  const globalStyles = css`
    .${treePrefixCls} {
      .${treeNodePrefixCls} {
        display: flex;
        align-items: center;
        min-height: 24px;
        padding: 0 4px;

        /* border-radius: 4px; */

        .${treePrefixCls}-node-content-wrapper {
          display: flex;
          align-items: center;
          height: 100%;
          flex: ${extras?.isTreeTitleFullWidth ? 1 : ''};
          ${styles?.treeNodeContentWrapper}
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
          &.${treePrefixCls}-iconEle {
            display: ${extras?.hideTreeIcon ? 'none' : 'inline-block'};
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
            margin-left: 6px;
            color: ${colors.gray[800]};
            font-size: 12px;
            line-height: 24px;
            flex: ${extras?.isTreeTitleFullWidth ? 1 : ''};
            ${styles?.treeTitle}
          }
        }

        &-selected {
          background-color: ${colors.grayAlternatives[50]};

          /* & > .${treePrefixCls}-switcher {
            & > svg {
              fill: ${colors.primary} !important;
            }
          } */

          & > .${treePrefixCls}-node-selected {
            background-color: transparent;
            box-shadow: none;
            opacity: 1;

            span.${treePrefixCls}-title {
              color: ${colors.gray[800]};
              font-weight: 600;
            }
          }
        }

        &:not(:last-of-type) {
          margin-bottom: 1px;
        }

        &:hover {
          background-color: ${colors.grayAlternatives[50]};

          /* & > .${treePrefixCls}-switcher {
            & > svg {
              fill: ${colors.primary} !important;
            }
          }

          span {
            &.${treePrefixCls}-title {
              color: ${colors.primary};
            }
            &.${treePrefixCls}-icon__customize svg {
              fill: ${colors.primary} !important;
              color: ${colors.primarySub2} !important;
            }
          } */
        }
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
