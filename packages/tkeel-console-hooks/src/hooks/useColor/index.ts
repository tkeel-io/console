import { ColorProps, Theme, useTheme } from '@chakra-ui/react';
import { getColor, transparentize } from '@chakra-ui/theme-tools';

type Color =
  | ColorProps['color']
  | 'primary'
  | 'brand'
  | 'brand.50'
  | 'brand.200'
  | 'brand.700'
  | 'grayAlternatives.50'
  | 'grayAlternatives.200'
  | 'grayAlternatives.300'
  | 'grayAlternatives.400'
  | 'grayAlternatives.700';

export default function useColor(color: Color, opacity?: number): string {
  const theme: Theme = useTheme();
  const newColor = color as string;
  const hexColor = getColor(theme, newColor, newColor) as string;
  if (opacity === undefined) {
    return hexColor;
  }
  return transparentize(hexColor, opacity)(theme);
}
