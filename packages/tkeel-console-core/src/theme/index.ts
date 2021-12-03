import { extendTheme } from '@chakra-ui/react';

import components from '@/theme/components';
import foundations from '@/theme/foundations';
import styles from '@/theme/styles';

const theme = extendTheme({
  config: { initialColorMode: 'light' },
  ...foundations,
  components,
  styles,
});

export default theme;
