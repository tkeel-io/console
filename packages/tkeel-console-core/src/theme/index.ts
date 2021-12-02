import { extendTheme } from '@chakra-ui/react';

import colors from '@/theme/colors';
import components from '@/theme/components';
import styles from '@/theme/styles';

const theme = extendTheme({
  config: { initialColorMode: 'light' },
  colors,
  components,
  styles,
});

export default theme;
