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
    };
  };
};

export default function SelectStyles({ prefixCls }: Props) {
  const selectPrefix = prefixCls;
  const { colors }: CustomTheme = useTheme();

  const globalStyles = css`
    .${selectPrefix} {
      &-single {
        &:not(.${selectPrefix}-customize-input) {
          .${selectPrefix}-selector {
            border-width: 1px;
            border-style: solid;
            border-color: ${colors.grayAlternatives[50]};
          }
        }
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
