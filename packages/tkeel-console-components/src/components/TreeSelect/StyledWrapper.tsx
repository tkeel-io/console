import 'rc-tree-select/assets/index.less';

import { css, Global } from '@emotion/react';

import iconCheckbox from './assets/icons/checkbox.svg';
import iconCheckboxChecked from './assets/icons/checkbox-checked.svg';
import iconCheckboxIndeterminate from './assets/icons/checkbox-indeterminate.svg';
import { PREFIX_CLS } from './constants';

const treePrefixCls = PREFIX_CLS;
const treeNodePrefixCls = `${treePrefixCls}-treenode`;

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
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
                font-size: 12px;
                line-height: 24px;
              }
            }

            &-selected {
              & > .${treePrefixCls}-switcher {
                & > svg {
                }
              }

              & > .${treePrefixCls}-node-selected {
                background-color: transparent;
                box-shadow: none;
                opacity: 1;

                span.${treePrefixCls}-title {
                  font-weight: 500;
                }
              }
            }

            &:not(:last-of-type) {
              margin-bottom: 8px;
            }

            &:hover {
              & > .${treePrefixCls}-switcher {
                & > svg {
                }
              }

              span {
                &.${treePrefixCls}-title {
                  font-size: 12px;
                  line-height: 24px;
                }
              }
            }
          }
        }
      `}
    />
  );
}
