import components from './components';
import foundations from './foundations';
import styles from './styles';

const theme = {
  styles,
  components,
  ...foundations,
};

export type BaseTheme = typeof theme;

export default theme;
