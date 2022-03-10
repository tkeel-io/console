import { Theme, useTheme } from '@chakra-ui/react';

import { StatusColors } from './types';

export default function useStatusColors(): StatusColors {
  const { colors }: Theme = useTheme();

  return {
    info: {
      colors: {
        primary: colors.blue[300],
        secondary: colors.blue[50],
      },
    },
    success: {
      colors: {
        primary: colors.green[300],
        secondary: colors.green[50],
      },
    },
    warning: {
      colors: {
        primary: colors.orange[300],
        secondary: colors.orange[50],
      },
    },
    error: {
      colors: {
        primary: colors.red[300],
        secondary: colors.red[100],
      },
    },
  };
}
