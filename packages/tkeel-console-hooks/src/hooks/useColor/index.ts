import { ColorProps, Theme, useTheme } from '@chakra-ui/react';
import { memoizedGet as get } from '@chakra-ui/utils';
import { TinyColor } from '@ctrl/tinycolor';

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

const getColor = (
  theme: Record<string, unknown>,
  color: string,
  fallback?: string
) => {
  const hex = get(theme, `colors.${color}`, color) as string;
  const { isValid } = new TinyColor(hex);
  return isValid ? hex : fallback;
};

export const transparentize =
  (color: string, opacity: number) => (theme: Record<string, unknown>) => {
    const raw = getColor(theme, color);
    return new TinyColor(raw).setAlpha(opacity).toRgbString();
  };

export default function useColor(color: Color, opacity?: number): string {
  const theme: Theme = useTheme();
  const newColor = color as string;
  const hexColor = getColor(theme, newColor, newColor) as string;
  if (opacity === undefined) {
    return hexColor;
  }
  return transparentize(hexColor, opacity)(theme);
}
