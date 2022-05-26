import components from './components';
import fonts from './fonts';
import foundations from './foundations';
import styles from './styles';

const theme = {
  styles,
  fonts,
  components,
  ...foundations,
};

export type BaseTheme = typeof theme;

export default theme;
