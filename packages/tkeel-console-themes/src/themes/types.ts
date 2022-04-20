import { ColorHues } from '@chakra-ui/react';

import type { BaseTheme } from './base-extension';

export type Colors = {
  primary: string;
  primarySub: string;
  primarySub2: string;
  primarySub3: string;
  'primary.500': string;

  brand?: ColorHues;
};

export type Theme = BaseTheme & {
  colors: Colors;
};
