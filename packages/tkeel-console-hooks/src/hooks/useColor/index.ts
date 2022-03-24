import { Theme, useTheme } from '@chakra-ui/react';
import { getColor, transparentize } from '@chakra-ui/theme-tools';

export default function useColor(color: string, opacity?: number): string {
  const theme: Theme = useTheme();
  const newColor = getColor(theme, color, color) as string;
  if (opacity === undefined) {
    return newColor;
  }
  return transparentize(newColor, opacity)(theme);
}
