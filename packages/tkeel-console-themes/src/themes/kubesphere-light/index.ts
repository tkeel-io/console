import { extendTheme } from '@chakra-ui/react';

import components from './components';
import foundations from './foundations';
import styles from './styles';

import baseExtension from '@/tkeel-console-themes/themes//base-extension';

const theme = extendTheme(baseExtension, {
  config: { initialColorMode: 'light' },
  styles,
  components,
  ...foundations,
});

export default theme;
