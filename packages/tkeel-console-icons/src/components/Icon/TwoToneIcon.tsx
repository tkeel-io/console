import { Theme, useTheme } from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';

import { twoToneIconDefaultProps } from './default-props';
import FilledIcon from './FilledIcon';
import { TwoToneIconPropsWithSvgComponent } from './types';

function TwoToneIcon({
  mode,
  color,
  twoToneColor,
  style,
  ...rest
}: TwoToneIconPropsWithSvgComponent): JSX.Element {
  const theme: Theme = useTheme();
  const { colors } = theme;
  const themeColor =
    typeof color === 'string' ? (getColor(theme, color, color) as string) : '';
  const themeTwoToneColor =
    typeof twoToneColor === 'string'
      ? (getColor(theme, twoToneColor, twoToneColor) as string)
      : '';

  const modeColors = {
    dark: {
      color: colors.whiteAlpha['700'],
      twoToneColor: colors.white,
    },
    light: {
      color: colors.gray['700'],
      twoToneColor: colors.gray['300'],
    },
  };

  const modeColor =
    mode === 'dark' ? modeColors.dark.color : modeColors.light.color;
  const modeTwoToneColor =
    mode === 'dark'
      ? modeColors.dark.twoToneColor
      : modeColors.light.twoToneColor;

  return (
    <FilledIcon
      {...rest}
      mode={mode}
      style={{
        fill: themeColor || modeColor,
        color: themeTwoToneColor || modeTwoToneColor,
        ...style,
      }}
    />
  );
}

TwoToneIcon.defaultProps = twoToneIconDefaultProps;

export default TwoToneIcon;
