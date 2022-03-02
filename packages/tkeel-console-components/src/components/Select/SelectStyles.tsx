import 'rc-select/assets/index.less';

import { Theme, useTheme } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

interface Props {
  prefixCls: string;
}

type CustomTheme = Theme & {
  colors: {
    primary: string;
    primarySub: string;
    grayAlternatives: {
      50: string;
      700: string;
    };
  };
};

export default function SelectStyles({ prefixCls }: Props) {
  const selectPrefix = prefixCls;
  const { colors }: CustomTheme = useTheme();
  const globalStyles = css`
    * {
      box-sizing: border-box;
    }
    .${selectPrefix} {
      width: inherit;
      // --------------- Single ----------------
      &-single {
        .${selectPrefix}-selector {
          display: flex;
          position: relative;
          cursor: pointer;
          border-radius: 4px;
          .${selectPrefix}-selection-search {
            width: 100%;
            padding: 8px 16px;
            font-size: 14px;
            line-height: 24px;
            &-input {
              width: 100%;
              pointer-events: none;
            }
          }

          .${selectPrefix}-selection-item,
            .${selectPrefix}-selection-placeholder {
            position: absolute;
            top: 8px;
            left: 16px;

            pointer-events: none;
            color: ${colors.grayAlternatives[700]};
            cursor: pointer;
          }
        }
        // Not customize
        &:not(.${selectPrefix}-customize-input) {
          .${selectPrefix}-selector {
            border-width: 1px;
            border-style: solid;
            font-size: 14px;
            line-height: 24px;
            border-color: ${colors.grayAlternatives[50]};
          }
        }
      }
      // -------------- Multiple ---------------
      &-multiple .${selectPrefix}-selector {
        padding: 8px 16px;
        border: 1px solid ${colors.primary};
        font-size: 14px;
        line-height: 24px;
        border-radius: 4px;

        .${selectPrefix}-selection-placeholder {
          position: absolute;
          top: 8px;
          left: 16px;
          font-size: 14px;
          line-height: 24px;
          pointer-events: none;
          color: ${colors.grayAlternatives[700]};
          cursor: pointer;
        }
        .${selectPrefix}-selection-item {
          flex: none;
          margin-right: 2px;
          background: ${colors.primarySub};
          font-weight: 500;
          padding: 4px;
          color: ${colors.primary};
          &-disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }
        .${selectPrefix}-selection-overflow {
          cursor: pointer;
          &-item {
            height: 24px;
            .${selectPrefix}-selection-item {
              &-remove {
                margin-left: 3px;
                font-size: 18px;
                cursor: pointer;
              }
            }
          }
        }
        .${selectPrefix}-selection-overflow-item-suffix {
          .${selectPrefix}-selection-search {
            .${selectPrefix}-selection-search-input {
              height: 24px;
              margin-top: 1px;
              color: ${colors.primary};
              background-color: ${colors.primarySub};
            }
          }
        }
      }
      // =============== Focused ===============
      &-focused {
        .${selectPrefix}-selector {
          border-color: ${colors.primary} !important;
        }
      }
      // ================ Icons ================
      &-allow-clear {
        &.${selectPrefix}-multiple .${selectPrefix}-selector {
          padding-right: 20px;
        }

        .${selectPrefix}-clear {
          right: 40px;
          top: 7px;
          font-size: 18px;
          color: ${colors.gray[400]};
          cursor: pointer;
        }
      }

      &-show-arrow {
        &.${selectPrefix}-multiple .${selectPrefix}-selector {
          padding-right: 20px;
        }

        .${selectPrefix}-arrow {
          right: 16px;
          top: 14px;
        }
      }
      // ============== Dropdown ===============
      &-dropdown {
        border: 1px solid ${colors.gray[200]};
        min-height: 60px;
        border-radius: 4px;
        padding: 16px 12px;
        color: ${colors.gray[700]};
        box-shadow: 0px 10px 15px ${colors.gray[100]},
          0px 4px 6px ${colors.gray[100]};
        z-index: 1400;
      }
      // =============== Option ================
      &-item {
        font-size: 12px;
        line-height: 20px;
        padding: 4px;
        cursor: pointer;

        // >>> Group
        &-group {
          color: #999;
          font-weight: bold;
          font-size: 80%;
        }

        // >>> Option
        &-option {
          position: relative;
          &-selected {
            /* background: ${colors.primarySub}; */
            color: ${colors.primary};
          }

          .${selectPrefix}-item-option-state {
            right: 4px;
            top: 2px;
          }

          // ------- Active -------
          &-active {
            background: ${colors.primarySub};
            color: ${colors.primary};
          }

          // ------ Disabled ------
          &-disabled {
            color: ${colors.gray[300]};
          }
        }

        // >>> Empty
        &-empty {
          text-align: center;
          color: #999;
        }
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
