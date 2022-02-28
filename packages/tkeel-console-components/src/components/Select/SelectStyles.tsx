import 'rc-select/assets/index.less';

// import { Theme, useTheme } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

interface Props {
  prefixCls: string;
}

/* type CustomTheme = Theme & {
  colors: {
    primary: string;
    primarySub: string;
  };
}; */

export default function TreeStyles({ prefixCls }: Props) {
  const selectPrefix = prefixCls;
  // const treeNodePrefixCls = `${treePrefixCls}-treenode`;
  // const { colors }: CustomTheme = useTheme();

  const globalStyles = css`
    .${selectPrefix} {
    }
  `;

  return <Global styles={globalStyles} />;
}
