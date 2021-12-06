import { extendTheme } from '@chakra-ui/react';

import components from '@/styles/themes/kubesphere-light/components';
import foundations from '@/styles/themes/kubesphere-light/foundations';
import styles from '@/styles/themes/kubesphere-light/styles';

const theme = extendTheme({
  config: { initialColorMode: 'light' },
  styles,
  components,
  ...foundations,
});

export default theme;
