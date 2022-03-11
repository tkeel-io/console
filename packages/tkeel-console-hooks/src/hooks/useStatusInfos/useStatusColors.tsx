import { Theme, useTheme } from '@chakra-ui/react';

import { StatusColors } from './types';

export default function useStatusColors(): StatusColors {
  const { colors }: Theme = useTheme();

  return {
    default: {
      primary: '',
      secondary: '',
    },
    info: {
      primary: colors.blue[300],
      secondary: colors.blue[50],
    },
    success: {
      primary: colors.green[300],
      secondary: colors.green[50],
    },
    warning: {
      primary: colors.orange[300],
      secondary: colors.orange[50],
    },
    error: {
      primary: colors.red[300],
      secondary: colors.red[100],
    },
  };
}
