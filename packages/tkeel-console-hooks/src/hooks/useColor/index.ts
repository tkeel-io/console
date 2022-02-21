import { Theme, useTheme } from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';

export default function useColor(color: string): string {
  const theme: Theme = useTheme();
  return getColor(theme, color, color) as string;
}
